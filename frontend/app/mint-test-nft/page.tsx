"use client"

import React, { useState } from 'react';
import { Zap, Users, Clock, Sparkles } from 'lucide-react';

const page = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      //logic
      setMinted(true);
      //toastify success message
      setTimeout(() => setMinted(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-800/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`
      }}></div>
      
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
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
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
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    {isMinting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span className="text-xl">Minting...</span>
                      </>
                    ) : minted ? (
                      <>
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        <span className="text-xl">Minted Successfully!</span>
                      </>
                    ) : (
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

