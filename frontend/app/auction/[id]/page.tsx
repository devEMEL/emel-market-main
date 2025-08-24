
"use client"
import React, { useEffect, useState } from 'react';
import { Clock, User, Gavel, Trophy, Eye, Wallet } from 'lucide-react';
import { ethers } from "ethers";
import EmelMarket from "@/abi/EmelMarket.json";
import { useEthersProvider, useEthersSigner } from '@/app/layout';
import { useAccount } from 'wagmi';
import Erc721Abi from "@/abi/Erc721.json";
import { Alchemy, Network } from 'alchemy-sdk';
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { useImageLoader } from '@/hooks/useImageLoader';
import { formatRelativeTime, getTimeLeft, truncateAddress } from '@/utils';

interface AuctionData {
  id: string;
  image: string;
  title: string;
  description: string;
  nftContract: string;
  tokenId: string;
  currentBid: string;
  startTime: string;
  endTime: string;
  seller: string;
  myBid: string;
  winningBid: string;
  winningAddress: string;
  isActive: boolean;
}

interface AuctionPageProps {
    params: {
        id: string;
    }
}

const alchemy = new Alchemy({
    apiKey: "TajhoIdNGy7RFjvAjEMca", 
    network: Network.ETH_SEPOLIA, 
});

    const query = gql`{
        auctions(where: { auctionId: "1" }) {
            id
            auctionId
            nftCA
            tokenId
            seller
            startTime
            endTime
            blockNumber
            blockTimestamp
            transactionHash
            status
        }
    }`


const url = 'https://api.studio.thegraph.com/query/119165/emelmarket/version/latest';
const headers = { Authorization: 'Bearer {api-key}' };

const page: React.FC<AuctionPageProps> = ({ params }) => {

    const { id } = params; 

    const { data, isSuccess } = useQuery({
        queryKey: ['auction-page-data'],
        async queryFn() {
            return await request(url, query, {}, headers)
        }
    });
    

    const [tokenDetails, setTokenDetails] = useState<any>({});
    const [bidAmount, setBidAmount] = useState('');
    const [showMyBid, setShowMyBid] = useState(false);
    const [showWinningBid, setShowWinningBid] = useState(false);
    const [showWinningAddress, setShowWinningAddress] = useState(false);

    const now = Math.floor(Date.now() / 1000);

    const imageUri = tokenDetails?.tokenImage;
    const { imageSrc } = useImageLoader(imageUri);
    // fetch auctions from indexer
    // display time left..........

    const provider = useEthersProvider();
    const signer = useEthersSigner()
    const { address } = useAccount();

    const [isOwner, setIsOwner] = useState<boolean>(false);

    const [param, setParam] = useState<string | null>("");
    const [price, setPrice] = useState<string>("");
    const [isAuction, setIsAuction] = useState<boolean>(false);
    const [auctionDuration, setAuctionDuration] = useState<string>("7");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const getUserTokenDetails = async() => {
     
        console.log("hello wolrd");
        console.log(data);
        console.log(data?.auctions[0].nftCA as `0x${string}`, BigInt(data?.auctions[0].tokenId));
        const response = await alchemy.nft.getNftMetadata(data?.auctions[0].nftCA as `0x${string}`, BigInt(data?.auctions[0].tokenId));
            

          
        console.log( response.image.originalUrl, response.name, response.contract.symbol);

         return {
            tokenImage: response.image.originalUrl,
            tokenName: response.name,
            tokenSymbol: response.contract.symbol
         }
     
       }

    // const contract = new ethers.Contract(
    //     contractAddressParam,
    //     Erc721Abi,
    //     signer
    // );



  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    

    try {

      //use status for hook to display success or error message
    } catch (error) {
      
    } 
  };

//   const handlePlaceBid = () => {
//     if (!bidAmount || parseFloat(bidAmount) <= parseFloat(auction?.currentBid || '0')) {
//       alert('Bid must be higher than current bid');
//       return;
//     }
//     // Implement bid placement logic here
//     alert(`Bid of ${bidAmount} ETH placed successfully!`);
//     setBidAmount('');
//   };


  useEffect(() => {
    console.log({id});
    let mounted = true;
    (async () => {
      try {
        if(isSuccess){
             const details = await getUserTokenDetails();
             if (mounted) setTokenDetails(details);
        }
       
      } catch (e) {
        console.error('Failed to fetch token details', e);
      }
    })();
    return () => {
      mounted = false;
    };

  }, [id, data, isSuccess]);

  // Loading Spinner
//     if (!auction) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-4 border-white border-t-transparent"></div>
//       </div>
//     );
//   }
// data?.auctions
  return (

        <div className="min-h-screen bg-gradient-deep text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button className="mb-6 text-white/70 hover:text-white transition-colors flex items-center space-x-2">
            <span>← Back to Auctions</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Image */}
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={imageSrc}
                    alt={tokenDetails.tokenName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    data?.auctions[0].status == "AUCTIONED" 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>

                    {
                      data?.auctions[0].endTime < now ? (
                        'Auction Ended Already'
                      ) : (
                        data?.auctions[0].status == "AUCTIONED" ? ('Live Auction') : (
                            data?.auctions[0].status == "CANCELLED" && 'Live Auction is cancelled'
                        )
                      )   
                    }
                  </span>
                </div>
              </div>

              {/* NFT Details */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">NFT Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Contract</span>
                    <span className="text-white font-mono text-sm">{truncateAddress(data?.auctions[0].nftCA)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Token ID</span>
                    <span className="text-white font-semibold">#{data?.auctions[0].tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Seller</span>
                    <span className="text-white font-mono text-sm">{truncateAddress(data?.auctions[0].seller)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auction Info */}
            <div className="space-y-8">
              {/* Title and Description */}

              {/* Time Left */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">Time Remaining</span>
                </div>
                <div className="text-3xl font-bold text-white">{getTimeLeft(data?.auctions[0].startTime, data?.auctions[0].endTime)}</div>
              </div>

              {/* Current Bid */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-2">
                  <Gavel className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Current Bid</span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">- ETH</div>
              </div>

              {/* Auction Timeline */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Auction Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Start Time</span>
                    <span className="text-white">{formatRelativeTime(data?.auctions[0].startTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">End Time</span>
                    <span className="text-white">{formatRelativeTime(data?.auctions[0].endTime)}</span>
                  </div>
                </div>
              </div>

              {/* Bidding Section */}
              {/* {auction.isActive && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Place Your Bid</h3>
                  <div className="flex space-x-3">
                    <input
                      type="number"
                      step="0.01"
                      min={parseFloat(auction.currentBid) + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter bid amount"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handlePlaceBid}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Bid
                    </button>
                  </div>
                </div>
              )} */}

              {/* Action Buttons */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowMyBid(!showMyBid)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>My Bid</span>
                </button>

                <button
                  onClick={() => setShowWinningBid(!showWinningBid)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Winning Bid</span>
                </button>

                <button
                  onClick={() => setShowWinningAddress(!showWinningAddress)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Winner</span>
                </button>
              </div> */}

              {/* Information Panels */}
              {/* {showMyBid && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="w-6 h-6 text-blue-400" />
                    <span className="text-blue-300 font-semibold">Your Current Bid</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{auction.myBid} ETH</div>
                </div>
              )} */}
{/* 
              {showWinningBid && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Trophy className="w-6 h-6 text-green-400" />
                    <span className="text-green-300 font-semibold">Winning Bid</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{auction.winningBid} ETH</div>
                </div>
              )} */}
{/* 
              {showWinningAddress && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Wallet className="w-6 h-6 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">Winning Address</span>
                  </div>
                  <div className="text-lg font-mono text-white break-all">{auction.winningAddress}</div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
        </div>
    )  

  
};

export default page;