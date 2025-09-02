## EmelMarket 🔒

### Overview

EmelMarket is a confidential NFT auction marketplace built on Zama's Fully Homomorphic Encryption (FHE) technology on the Sepolia testnet. The platform enables users to participate in NFT auctions while keeping their bid amounts completely private and encrypted throughout the entire auction process.

The marketplace leverages cutting-edge cryptographic technology to ensure that:
- Bid amounts remain confidential until the auction is resolved
- Only the auction winner and final amounts are revealed
- All participants maintain privacy during the bidding process

##### Demo Link: https://emel-market-main.vercel.app/get-cweth

##### Demo Video: https://m.youtube.com/watch?v=u0KXpgzDdI8

[![Watch the video](https://img.youtube.com/vi/u0KXpgzDdI8/maxresdefault.jpg)](https://www.youtube.com/watch?v=u0KXpgzDdI8)

### 🌟 Key Features

##### Private Bidding System
- Confidential Bids: All bid amounts are encrypted using FHE, ensuring complete privacy
- Secure Comparisons: The system can determine the highest bid without revealing individual amounts
- Protected Identity: Bidder identities remain private until auction resolution

##### Complete NFT Marketplace
- NFT Minting: Users can mint NFTs directly if they don't own any on the Sepolia network
- Profile Management: View and manage your NFT collection on your profile page
- Auction Creation: List any owned NFT for auction with custom start/end times

##### Confidential Payment System
- cWETH Integration: Convert ETH to Confidential WETH (cWETH) for private transactions
- Secure Transfers: All payment transfers are encrypted and confidential
- Automatic Refunds: Losing bidders receive automatic refunds after auction resolution

##### Auction Management
- Time-Based Auctions: Set custom start and end times for auctions
- Auction Resolution: Auction owners can finalize auctions to determine winners
- NFT Transfer: Automatic NFT transfer to the winning bidder
- Cancellation: Cancel inactive auctions before they receive bids


### 📊 Deployed Contracts

| Contract Name | Address | Explorer Link |
|---------------|---------|---------------|
| SimpleNFT | 0xfe21a6188cDcdEe32Dc79cA56F5BE48F9A45022B | [View on Etherscan](https://sepolia.etherscan.io/address/0x9Ad671c2FeF85479dFCf48B998f20ffF2E6625fE) |
| ConfidentialWETH | 0x648FdB91fF08251Be5AaC2AEaE3B0Dd8E12922d3 | [View on Etherscan](https://sepolia.etherscan.io/address/0xA3b95080674fBd12fC3626046DCa474c48d012d8) |
| FHEEmelMarket | 0xE9916c794D19C7627Efc24DefF825BBD9Aa0672D | [View on Etherscan](https://sepolia.etherscan.io/address/0xA8B39ecfbB39c6749C8BA40ee9d349aB844F93cE) |

### 🔄 How It Works

##### 1. Setup & Preparation
- Mint NFTs: Users without NFTs can mint new ones
- Convert to cWETH: Convert ETH to Confidential WETH for private bidding
- View Collection: Browse your NFTs on the profile page

##### 2. Creating Auctions
- Select an NFT from your collection
- Set auction start and end times
- The NFT is locked in the marketplace contract
- Auction becomes visible to all users

##### 3. Bidding Process
- Users submit encrypted bid amounts using their cWETH balance
- All bids are confidential - no one can see the amounts
- Users can increase their bids multiple times
- The system tracks the highest bid without revealing amounts

##### 4. Auction Resolution
1. Auction ends based on the predetermined time
2. Auction owner calls decryptWinningAddress() to initiate winner selection
3. The system decrypts the winning address through a callback
4. Owner calls resolveAndRefundLosers() to finalize the auction:
   - Losing bidders receive automatic refunds
   - Winner's payment is transferred to auction owner
   - NFT is transferred to the winning bidder
##### 5. Privacy & Security
- Bid amounts remain encrypted throughout the process
- Only the final winner is revealed
- All losing bids are refunded automatically
- The system prevents reentrancy attacks and ensures secure operations

### 🚀 Getting Started

##### Prerequisites
- Node.js and npm installed
- MetaMask or compatible Web3 wallet
- Some Sepolia testnet ETH for transactions
- Pinata account for IPFS metadata storage

##### Installation

```
git clone https://github.com/devEMEL/emel-market-main
cd frontend
npm install
touch .env
echo 'NEXT_PUBLIC_PINATA_JWT="your-pinata-jwt"' >> .env

npm run dev
```

#### Built with ❤️ using Zama FHE technology
