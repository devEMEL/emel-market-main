import { useImageLoader } from '@/hooks/useImageLoader';
import { getTimeLeft } from '@/utils'
import React from 'react';
import { useAccount } from 'wagmi';

interface NFT {
  tokenImage: string;
  contractAddress: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
}


interface Auction extends NFT {
  auctionId: string;
  seller: string;
  startTime: string;
  endTime: string;
  blockTimestamp: string;
  transactionHash: string;
  status: 'AUCTIONED' | 'BID' | 'SOLD' | 'CANCELLED';
}

interface AuctionCardProps {
    auction: Auction;
    isAuctionPage: boolean;
}

const AuctionCard: React.FC<AuctionCardProps> = ({auction, isAuctionPage}) => {

     const { address } = useAccount();
    //  const { imageSrc, isLoading, error } = useImageLoader(collection.imageUrl);
  return (

        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          <img src={auction.tokenImage} alt={auction.tokenName} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{auction.tokenName} #{auction.tokenId}</h3>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Bid:</span>
                <span className="text-green-400">- ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Time Left:</span>
                <span className="text-yellow-400">{getTimeLeft(auction.startTime, auction.endTime)}</span>
              </div>
            </div>
          </div>

          {/* Bid button */}

          {/* Cancel Button */}
          {
            !isAuctionPage ? 
            (<div>
                <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50 mb-4"
            >
                Place Bid
            </button>
            <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50"
            >
                {/* {address == auction.seller && 'Cancel Bid'} */}
                Cancel Bid
            </button>
            </div>) :
            <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50"
            >
                {/* {address == auction.seller && 'Cancel Bid'} */}
                Cancel Bid
            </button>
          }

        </div>
      )
}

export default AuctionCard;