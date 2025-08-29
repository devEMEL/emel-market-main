// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;  

import {FHE, externalEuint64, euint64, eaddress, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {cWETH} from "./cWETH.sol";

contract FHEEmelMarket is SepoliaConfig, ReentrancyGuard, ERC721Holder {
    using FHE for *;

    struct Auction {
        address nftContract;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        address beneficiary;
        bool isActive;
        bool nftClaimed;
        euint64 highestBid;
        eaddress winningAddress;
        address winnerAddress;
        address[] bidders;
        mapping(address => euint64) bids;
        uint256 decryptionRequestId;
    }

    cWETH public paymentToken;
    uint256 public auctionCount;
    mapping(uint256 => Auction) public auctions;
    mapping(address => mapping(uint256 => bool)) private nftOnAuction;
    mapping(uint256 => uint256) internal auctionIndexByRequestId;

    event AuctionCreated(uint256 indexed auctionId, address indexed nftCA, uint256 tokenId, address indexed seller, uint256 startTime, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId);
    event AuctionResolved(uint256 indexed auctionId);
    event NFTClaimed(uint256 indexed auctionId);
    event AuctionCancelled(uint256 indexed auctionId);

    constructor(address _paymentToken) {
        paymentToken = cWETH(_paymentToken);
    }

    modifier onlyDuringAuction(uint256 auctionId) {
        Auction storage a = auctions[auctionId];
        require(block.timestamp >= a.startTime, "Too early");
        require(block.timestamp < a.endTime, "Too late");
        _;
    }

    modifier onlyAfterEnd(uint256 auctionId) {
        Auction storage a = auctions[auctionId];
        require(block.timestamp >= a.endTime, "Auction still running");
        _;
    }

    function createAuction(address nftContract, uint256 tokenId,uint256 startTime, uint256 endTime) external {
        require(!nftOnAuction[nftContract][tokenId], "NFT already on auction");
        require(startTime < endTime, "Invalid time");

        Auction storage a = auctions[auctionCount];
        a.nftContract = nftContract;
        a.tokenId = tokenId;
        a.startTime = startTime;
        a.endTime = endTime;
        a.beneficiary = msg.sender;
        a.isActive = false;
        a.decryptionRequestId = 0;

        // Lock NFT
        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);
        nftOnAuction[nftContract][tokenId] = true;

        emit AuctionCreated(auctionCount, nftContract, tokenId, msg.sender, startTime, endTime);
        auctionCount++;
    }


    function bid(uint256 auctionId, externalEuint64 encryptedAmount, bytes calldata proof) external onlyDuringAuction(auctionId) nonReentrant {
        Auction storage a = auctions[auctionId];
        
        require(nftOnAuction[a.nftContract][a.tokenId], "NFT not on auction");
        
        if(!a.isActive) {
            a.isActive = true;
        }
        
        // Get encrypted bid and grant permission
        euint64 amount = FHE.fromExternal(encryptedAmount, proof);
        FHE.allowThis(amount); // 

        // Transfer cWETH to contract
        FHE.allowTransient(amount, address(paymentToken));
        euint64 transferred = paymentToken.confidentialTransferFrom(msg.sender, address(this), amount);
        FHE.allowThis(transferred); 
        
        // Handle bid update with proper initialization check
        bool isFirstBid = !FHE.isInitialized(a.bids[msg.sender]);
        
        if (isFirstBid) {
            // First bid from this user
            a.bids[msg.sender] = transferred;
            a.bidders.push(msg.sender);
        } else {
            // User has bid before - grant permission to existing bid first
            FHE.allowThis(a.bids[msg.sender]);
            a.bids[msg.sender] = FHE.add(a.bids[msg.sender], transferred);
        }
    
        // Grant permissions for the updated bid
        FHE.allowThis(a.bids[msg.sender]);
        FHE.allow(a.bids[msg.sender], msg.sender);
        
        // Handle highest bid update
        bool isFirstBidEver = !FHE.isInitialized(a.highestBid);
        
        if (isFirstBidEver) {
            // This is the first bid in the auction
            a.highestBid = a.bids[msg.sender];
            a.winningAddress = FHE.asEaddress(msg.sender);
        } else {
            // Grant permission to existing highest bid
            FHE.allowThis(a.highestBid);
            FHE.allowThis(a.winningAddress);
            
            ebool newWinner = FHE.lt(a.highestBid, a.bids[msg.sender]);
            a.highestBid = FHE.select(newWinner, a.bids[msg.sender], a.highestBid);
            a.winningAddress = FHE.select(newWinner, FHE.asEaddress(msg.sender), a.winningAddress);
        }
    
        // Grant contract final permissions
        FHE.allowThis(a.highestBid);
        FHE.allowThis(a.winningAddress);
        
        // FHE.allow(a.highestBid, msg.sender);
        // FHE.allow(a.winningAddress, msg.sender);
        
        emit BidPlaced(auctionId);
}

   function resolveAndRefundLosers(uint256 auctionId) 
    external 
    onlyAfterEnd(auctionId) 
    nonReentrant 
{
    Auction storage a = auctions[auctionId];
    require(msg.sender == a.beneficiary, "Only auction owner can resolve");
    require(a.isActive, "Auction already resolved");
    require(a.winnerAddress != address(0), "No winner yet");

    a.isActive = false;

    // read winner
    address winner = a.winnerAddress;


    // Refund losing bidders
    for (uint256 i = 0; i < a.bidders.length; i++) {
        address bidder = a.bidders[i];
        if (bidder != winner) {
            euint64 refundAmount = a.bids[bidder];
            a.bids[bidder] = FHE.asEuint64(0);
            FHE.allowTransient(refundAmount, address(paymentToken));
            paymentToken.confidentialTransfer(bidder, refundAmount);

        }
    }

    // Transfer highest bid to auction owner
    FHE.allowTransient(a.highestBid, address(paymentToken));
    paymentToken.confidentialTransfer(a.beneficiary, a.highestBid);


    // Transfer NFT to winner
    IERC721(a.nftContract).transferFrom(address(this), winner, a.tokenId);

    // Mark NFT as no longer on auction
    nftOnAuction[a.nftContract][a.tokenId] = false;

    // Mark NFT as claimed and cleanup
    a.nftClaimed = true;
    delete auctions[auctionId];


    emit AuctionResolved(auctionId);
    emit NFTClaimed(auctionId);
}


    function cancelAuction(uint256 auctionId) external {
        Auction storage a = auctions[auctionId];
        require(msg.sender == a.beneficiary, "Not auction owner");
        require(!a.isActive, "Can only cancel inactive auction");
        require(block.timestamp < a.endTime, "Auction already ended");

 
        // Return NFT to owner
        IERC721(a.nftContract).transferFrom(address(this), a.beneficiary, a.tokenId);

        nftOnAuction[a.nftContract][a.tokenId] = false;
        delete auctions[auctionId];

        emit AuctionCancelled(auctionId);
    }



    // Get decryption request ID for a proposal
    function getDecryptionRequestId(uint256 auctionId) external view returns (uint256) {
        Auction storage a = auctions[auctionId];
        return a.decryptionRequestId;
    }

        // Helper to query a bidder's bid
    function getBid(uint256 auctionId, address bidder) external view returns (euint64) {
        return auctions[auctionId].bids[bidder];
    }

// get users bid on a particular auction
    function getEncryptedBid(uint256 auctionId, address account) external view returns (euint64) {
        Auction storage a = auctions[auctionId];

        return a.bids[account];
   }

      /// @notice Get the winning address when the auction is ended
    /// @dev Can only be called after the winning address has been decrypted
    /// @return winnerAddress The decrypted winning address
    function getWinnerAddress(uint256 auctionId) external view returns (address) {
        Auction storage a = auctions[auctionId];
        require(a.winnerAddress != address(0), "Winning address has not been decided yet");
        return a.winnerAddress;
    }


// called first to set a. winnerAddress

  function decryptWinningAddress(uint256 auctionId) public onlyAfterEnd(auctionId) {
    Auction storage a = auctions[auctionId];
    bytes32[] memory cts = new bytes32[](1);
    cts[0] = FHE.toBytes32(a.winningAddress);
    uint256 requestId = FHE.requestDecryption(cts, this.resolveAuctionCallback.selector);
    a.decryptionRequestId = requestId;
    auctionIndexByRequestId[requestId] = auctionId;

  }


  function resolveAuctionCallback(uint256 requestId, address resultWinnerAddress, bytes[] memory signatures) public {
    FHE.checkSignatures(requestId, signatures);

    uint256 auctionId = auctionIndexByRequestId[requestId];
    Auction storage a = auctions[auctionId];
    a.winnerAddress = resultWinnerAddress;

  }

}
