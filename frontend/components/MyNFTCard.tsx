import { useImageLoader } from '@/hooks/useImageLoader';
import { truncateAddress } from '@/utils';
import Link from 'next/link';
import React, { useState } from 'react'
import { Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import EmelMarket from "@/abi/EmelMarket.json";
import { createConfig, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from "viem/actions"
import { createPublicClient, http } from 'viem';
import { sepolia } from 'wagmi/chains';
import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '@/app/layout';



interface NFT {
  tokenImage: string;
  contractAddress: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
}

interface MyNFTCardProps {
    nft: NFT
}



const MyNFTCard: React.FC<MyNFTCardProps> = ({nft}) => {
    const [showModal, setShowModal] = useState(false);

    const { imageSrc, isLoading, error } = useImageLoader(nft.tokenImage);

    const [duration, setDuration] = useState("");
    const [isCreatingAuction, setIsCreatingAuction] = useState(false);


    const provider = useEthersProvider();
    const signer = useEthersSigner();


    const erc721ApproveAbi = [
  {
    "type": "function",
    "name": "approve",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
    ],
    "outputs": []
  }
]


    const handleAuctionNFT = async() => {
        if(!duration) return;
        const now = Date.now(); // in milliseconds, / by 1000 to get seconds
        const startTime = Math.round(now / 1000);
        const endTime = String(Number(duration) + startTime);
        console.log({startTime})
        console.log({endTime});

        setIsCreatingAuction(true);

   
        const erc721Contract = new ethers.Contract(
           nft.contractAddress,
            erc721ApproveAbi,
            signer
        );
        const emelMarketContract = new ethers.Contract(
           EmelMarket.address,
            EmelMarket.abi,
            signer
        );

        const erc721ContractTx = await erc721Contract.approve(EmelMarket.address, BigInt(nft.tokenId));
        const response = await erc721ContractTx.wait();
        console.log(response);

        if(response) {
            // create auction
            const emelMarketContractTx = await emelMarketContract.createAuction(nft.contractAddress, BigInt(nft.tokenId), BigInt(startTime), BigInt(endTime));

            const res = await emelMarketContractTx.wait();
            console.log(res);

        }

        toast.success("Auction created successfully");
        setIsCreatingAuction(false);
        setShowModal(false);

        
    }

  return (
     <div className="bg-gray-800/30 rounded-lg overflow-hidden">
                <Link 
                href={""}
                onClick={() => {
                    setShowModal(true);
                }}
                >
                <img src={imageSrc} alt={nft.tokenName} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{nft.tokenName} #{nft.tokenId}</h3>
                    <p className="text-gray-400 text-sm truncate">CA: {truncateAddress(nft.contractAddress)}</p>

                <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 disabled:bg-white/50 mt-4"
            >
                {/* {address == auction.seller && 'Cancel Bid'} */}
                Auction NFT
            </button>
                </div>
                </Link>
                
                {/* modal */}
                {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="px-4 bg-white text-black w-3/3 md:w-1/2">

                    <h2 className='text-2xl mb-4 mt-10 font-bold text-center'>Auction NFT</h2>
           <img
                src={imageSrc}
                alt={"image"}
                className="w-full h-48 object-cover pt-4"
            />

            <p className='mt-6'>How many hrs should the auction last?</p>
            <input
              type="text"
              placeholder="24 hrs"
            //   value={endTime}
              onChange={(e) => setDuration(String(Number(e.target.value) * 60 * 60))}
              className="mt-4 w-full p-2 border rounded mb-4"
            />
            <p>{duration} seconds</p>

            <div className="flex justify-end space-x-2 mb-10">
         

               <button
                onClick={handleAuctionNFT}
                className="w-3/4 text-white bg-black font-bold rounded-lg mt-4"
            >
                
                {isCreatingAuction ? (
                    <>
                        <div className="animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span className="text-xl">Creating Auction...</span>
                        </>
                ) : (
                    <div className='flex items-center justify-center'>
                         <Zap className="w-6 h-6" />
                         <span className="text-xl">Auction NFT</span>
                    </div>
                )
                }
                
               
            </button>
            <button
                onClick={() => setShowModal(false)}
                className="w-1/4 text-black bg-white font-bold py-3 rounded-lg mt-4 border-2 border-black"
            >
                {/* {address == auction.seller && 'Cancel Bid'} */}
                Cancel
            </button>
              
            </div>
          </div>
        </div>
      )}

            </div>
  )
}

export default MyNFTCard;
