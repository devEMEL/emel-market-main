"use client"

import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import Erc721 from '@/abi/Erc721.json';
import { getTokenURI } from '@/utils';
import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '../layout';


const page = () => {
  const [isMinting, setIsMinting] = useState(false);
//   const [minted, setMinted] = useState(false);
  const [fetchingTokenURI, setFetchingTokenURI] = useState(false);

  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

   const provider = useEthersProvider();
   const signer = useEthersSigner();

  const handleMint = async() => {
 
    setFetchingTokenURI(true);

    // prepare tokenURI
    const metadata = {
        name: "Cosmic Genesis", // next time
        description: " An extraordinary journey through the cosmos, captured in a single moment of stellar beauty. This unique piece represents the birth of new worlds and infinite possibilities.",
        image: "ipfs://bafkreifmecajuvxhwavl5etrxzru5brpf5olvyuusndoow7xn6sbzf3pry",
    };
    console.log(metadata);
    const tokenURI = await getTokenURI(metadata);
    console.log({tokenURI});

    setFetchingTokenURI(false);

    setIsMinting(true);
    
    const erc721Contract = new ethers.Contract(
        Erc721.address,
        Erc721.abi,
        signer
    );

    const erc721ContractTx = await erc721Contract.mint(String(tokenURI));
    const response = await erc721ContractTx.wait();
    console.log(response);
    setIsMinting(false);

    toast.success('NFT minted successfully....');
  };
  

  return (
    <div className="min-h-screen bg-gray-800/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Cosmic Genesis
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A unique digital artwork from the depths of space, waiting to find its new owner
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* NFT Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out">
                  <img
                    src="https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg"
                    alt="Cosmic Genesis NFT"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
              </div>

              {/* NFT Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Cosmic Genesis</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    An extraordinary journey through the cosmos, captured in a single moment of stellar beauty. 
                    This unique piece represents the birth of new worlds and infinite possibilities.
                  </p>
                </div>



                {/* Mint Button */}
                <button
                  onClick={handleMint}
                  className="w-full bg-white text-black font-bold py-4 px-8 rounded-2xl overflow-hidden"
                >
                  <div className="relative flex items-center justify-center space-x-3">


                    {isMinting && (<>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span className="text-xl">Minting NFT...</span>
                      </>)}
                      {fetchingTokenURI && (
                        <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span className="text-xl">Fetching TokenURI...</span>
                        </>
                      )}
                      {!isMinting && !fetchingTokenURI && (
                        <>
                         <Zap className="w-6 h-6" />
                         <span className="text-xl">Mint NFT</span>
                       </>
                      )}

                  </div>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default page;


