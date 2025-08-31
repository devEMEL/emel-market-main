// @ts-nocheck
'use client';
import { useImageLoader } from '@/hooks/useImageLoader';
import { getTimeLeft } from '@/utils'
import { Alchemy, Network } from 'alchemy-sdk';
import React, { useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { ethers, getAddress } from 'ethers';
import { useEthersProvider, useEthersSigner } from '@/app/layout';
import EmelMarket from "@/abi/EmelMarket.json";
import { toast } from 'react-toastify';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



interface NFT {
  tokenImage: string;
  nftCA: string;
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

const alchemy = new Alchemy({
    apiKey: "TajhoIdNGy7RFjvAjEMca", 
    network: Network.ETH_SEPOLIA, 
});
     

const AuctionCard: React.FC<AuctionCardProps> = ({auction, isAuctionPage}) => {

    const [tokenDetails, setTokenDetails] = useState<any>({});
    const [isCancellingAuction, setIsCancellingAuction] = useState(false);
     const { address } = useAccount();
     const imageUri = tokenDetails?.tokenImage;
     const router = useRouter();

     const { imageSrc, isLoading, error } = useImageLoader(imageUri);
     
    const provider = useEthersProvider();
    const signer = useEthersSigner();
     

     // get token name, symbol and tokenuri from alchemy/read contract
     
      const getUserTokenDetails = async() => {
     
        console.log(auction.nftCA as `0x${string}`, BigInt(auction.tokenId));
        const response = await alchemy.nft.getNftMetadata(auction.nftCA as `0x${string}`, BigInt(auction.tokenId));
            

          
        console.log( response.image.originalUrl, response.name, response.contract.symbol);

         return {
            tokenImage: response.image.originalUrl,
            tokenName: response.name,
            tokenSymbol: response.contract.symbol
         }
     
       }

       const handleCancelAuction = async() => {
        try {
            setIsCancellingAuction(true);
            const emelMarketContract = new ethers.Contract(
                EmelMarket.address,
                EmelMarket.abi,
                signer
            );
    
            const emelMarketContractTx = await emelMarketContract.cancelAuction(BigInt(auction.auctionId));
            const response = await emelMarketContractTx.wait();
            console.log(response);

            toast.success("Auction cancelled successfully");
            setIsCancellingAuction(false);
        } catch(err) {
            console.log(err);
        }
        
       }
     useEffect(() => {

        let mounted = true;
    (async () => {
      try {
        const details = await getUserTokenDetails();
        if (mounted) setTokenDetails(details);
      } catch (e) {
        console.error('Failed to fetch token details', e);
      }
    })();
    return () => {
      mounted = false;
    };

     }, []);

  return (

        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          <img src={imageSrc} alt={tokenDetails.tokenName} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{tokenDetails.tokenName} #{auction.tokenId}</h3>
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
                // href={`/auction/${auction.auctionId}`}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50 mb-4"
            >
                View Auction Details
            </button>
            <button
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50 mb-4"
                onClick={handleCancelAuction}
            >
                
                {isCancellingAuction ? (
                    <>
                        <div className="animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span className="">Cancelling Auction...</span>
                        </>
                ) : (
                    <div className='flex items-center justify-center'>
                         <Zap className="w-6 h-6" />
                         <span className="">{getAddress(String(address)) == getAddress(auction.seller) && 'Cancel Auction'}</span>
                    </div>
                )
                }
                
            </button>
            </div>) :
            <button
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50"
                onClick={() => router.push(`/auction/${auction.auctionId}`)}

            >
                View Auction Details
            </button>
          }

        </div>
      )
}

export default AuctionCard;