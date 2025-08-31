// @ts-nocheck
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
        name: "Bored Ape",
        description: "Bored Ape Yacht Club is a collection of 10,000 unique digital apes living on the Ethereum blockchain.",
        image: "ipfs://bafkreiatjyx5hkzw4iciwuoj24yz56mng6ls2e6thcowhv4357p742asm4",
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
              Bored Ape
            </h1>
          </div>

          {/* Main Card */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* NFT Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out">
                  <img
                    src="https://ipfs.io/ipfs/bafkreiatjyx5hkzw4iciwuoj24yz56mng6ls2e6thcowhv4357p742asm4"
                    alt="Bored Ape"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
              </div>

              {/* NFT Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Bored Ape</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Bored Ape Yacht Club is a collection of 10,000 unique digital apes living on the Ethereum blockchain.
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


