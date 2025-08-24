import { useImageLoader } from '@/hooks/useImageLoader';
import { truncateAddress } from '@/utils';
import Link from 'next/link';
import React, { useState } from 'react'
import { FormInput } from './FormInput';


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

    const [endTime, setEndTime] = useState("");

  return (
     <div className="bg-gray-800/30 rounded-lg overflow-hidden">
                <Link 
                // href={{
                //     pathname:`/auction/${nft.tokenId}`,
                //     query: { nft: JSON.stringify(nft)}
                href={""}
                onClick={() => {
                    setShowModal(true);
                }}
                // }}
                >
                <img src={imageSrc} alt={nft.tokenName} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{nft.tokenName} #{nft.tokenId}</h3>
                    {/* <p className="text-gray-400 text-sm">Token ID: {nft.tokenId}</p> */}
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
              onChange={(e) => setEndTime(String(Number(e.target.value) * 60 * 60))}
              className="mt-4 w-full p-2 border rounded mb-4"
            />
            <p>{endTime} seconds</p>

            <div className="flex justify-end space-x-2 mb-10">
         

               <button
                type="submit"
                className="w-3/4 text-white bg-black font-bold py-3 rounded-lg mt-4"
            >
                {/* {address == auction.seller && 'Cancel Bid'} */}
                Auction NFT
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