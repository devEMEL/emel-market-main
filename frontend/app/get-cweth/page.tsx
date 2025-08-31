// @ts-nocheck
"use client"
import React, { useState } from 'react';
import { ArrowUpDown, Wallet, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { etherToWei } from '@/utils';
import CWeth from "@/abi/CWeth.json";
import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from '../layout';
import { useAccount } from 'wagmi';
import { useFhe } from '@/components/FheProvider';

interface ConversionStep {
  step: number;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const page = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSteps1, setConversionSteps1] = useState<ConversionStep[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');

  const fhe = useFhe();

     const signer = useEthersSigner();

     const { address } = useAccount();

  const handleEthToCweth = async () => {
    console.log("eth to cweth");
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      alert('Please enter a valid ETH amount');
      return;
    }
    console.log({ethAmount});
    const ethAmountInWei = etherToWei(ethAmount);
    console.log({ethAmount: ethAmountInWei});

    setIsConverting(true);
    setConversionSteps1([
      { step: 1, description: 'Converting ETH to CWETH', status: 'pending' },
    ]);

    try {
      // Step 1: Deposit ETH to CWETH
      setCurrentOperation('Converting ETH to CWETH...');
      setConversionSteps1(prev => prev.map(step => 
        step.step === 1 ? { ...step, status: 'processing' } : step
      ));

        const cWethContract = new ethers.Contract(
            CWeth.address,
            CWeth.abi,
            signer
        );
    
        const wethContractTx = await cWethContract.deposit(address, { value: BigInt(ethAmountInWei) });
        const response = await wethContractTx.wait();
        console.log(response);
      
      setConversionSteps1(prev => prev.map(step => 
        step.step === 1 ? { ...step, status: 'completed' } : step
      ));

    
      setCurrentOperation('Conversion completed successfully!');
      setEthAmount('');
      
    } catch (error) {
      setConversionSteps1(prev => prev.map(step => 
        step.status === 'processing' ? { ...step, status: 'error' } : step
      ));
      setCurrentOperation('Conversion failed. Please try again.');
    } finally {
      setTimeout(() => {
        setIsConverting(false);
        setCurrentOperation('');
        setConversionSteps1([]);
      }, 3000);
    }
  };




  return (
<div className="min-h-screen bg-gradient-deep text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              ETH ↔ CWETH Converter
            </h1>
            <p className="text-xl text-gray-300">
              Convert between ETH and Wrapped ETH seamlessly
            </p>
          </div>

          {/* Main Converter Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            
            {/* ETH to CWETH Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Wallet className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">ETH → CWETH</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    placeholder="0.0"
                    disabled={isConverting}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
                
                <button
                  onClick={handleEthToCweth}
                  disabled={isConverting || !ethAmount}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                           disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl 
                           transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed 
                           disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {isConverting && conversionSteps1.some(step => step.step <= 2) ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{currentOperation}</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="w-5 h-5" />
                      <span>Convert ETH to CWETH</span>
                    </>
                  )}
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default page;