
"use client"
import React, { useState } from 'react';
import { ArrowUpDown, Wallet, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { etherToWei } from '@/utils';
import CWeth from "@/abi/CWeth.json";
import Weth from "@/abi/Weth.json";
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
  const [cwethAmount, setCwethAmount] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSteps1, setConversionSteps1] = useState<ConversionStep[]>([]);
  const [conversionSteps2, setConversionSteps2] = useState<ConversionStep[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');

  const fhe = useFhe();

     const provider = useEthersProvider();
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
      { step: 1, description: 'Deposit ETH to WETH contract', status: 'pending' },
      { step: 2, description: 'Wrap WETH to CWETH', status: 'pending' }
    ]);

    try {
      // Step 1: Deposit ETH to WETH
      setCurrentOperation('Depositing ETH to WETH contract...');
      setConversionSteps1(prev => prev.map(step => 
        step.step === 1 ? { ...step, status: 'processing' } : step
      ));

        const wethContract = new ethers.Contract(
            Weth.address,
            Weth.abi,
            signer
        );
    
        const wethContractTx = await wethContract.deposit({ value: BigInt(ethAmountInWei) });
        const response = await wethContractTx.wait();
        console.log(response);
      
      setConversionSteps1(prev => prev.map(step => 
        step.step === 1 ? { ...step, status: 'completed' } : step
      ));

      // Step 2: Wrap WETH to CWETH
      setCurrentOperation('Wrapping WETH to CWETH...');
      setConversionSteps1(prev => prev.map(step => 
        step.step === 2 ? { ...step, status: 'processing' } : step
      ));

      // call wrap on cweth contract
      // approve cweth contract to spend our weth
     
      const wethContract2 = new ethers.Contract(
            Weth.address,
            Weth.abi,
            signer
        );
       const wethContract2Tx = await wethContract2.approve(CWeth.address, BigInt(ethAmountInWei));
        const response2 = await wethContract2Tx.wait();
        console.log(response2);

        if(response2) { 
           
            const cWethContract = new ethers.Contract(
                CWeth.address,
                CWeth.abi,
                signer
            );
        
            const cWethContractTx = await cWethContract.wrap(String(address), ethAmountInWei);
            const response3 = await cWethContractTx.wait();
            console.log(response3);
        }

      

      setConversionSteps1(prev => prev.map(step => 
        step.step === 2 ? { ...step, status: 'completed' } : step
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

//   const handleCwethToEth = async () => {
//     console.log("cweth to eth...");
//     if (!cwethAmount || parseFloat(cwethAmount) <= 0) {
//       alert('Please enter a valid CWETH amount');
//       return;
//     }

//     console.log({cwethAmount});
//     const cwethAmountInWei = etherToWei(cwethAmount);
//     console.log({cwethAmount: cwethAmountInWei});

//     setIsConverting(true);
//     setConversionSteps2([
//       { step: 1, description: 'Unwrap CWETH to WETH', status: 'pending' },
//       { step: 2, description: 'Withdraw WETH to ETH', status: 'pending' }
//     ]);

//     try {
//       // Step 1: Unwrap CWETH to WETH
//       setCurrentOperation('Unwrapping CWETH to WETH...');
//       setConversionSteps2(prev => prev.map(step => 
//         step.step === 1 ? { ...step, status: 'processing' } : step
//       ));

//       // call unwrap on cweth contract (to get back our weth)

// //    function unwrap(
// //         address from,
// //         address to,
// //         externalEuint64 encryptedAmount,
// //         bytes calldata inputProof
// //     ) public virtual {
// //         _unwrap(from, to, FHE.fromExternal(encryptedAmount, inputProof));
// //     }

//       const cWethContract = new ethers.Contract(
//             CWeth.address,
//             CWeth.abi,
//             signer
//         );
    
//         if (!fhe) return console.log("Still loading...");

        
//          const encryptedValue = await fhe
//             .createEncryptedInput(CWeth.address, address)
//             .add64(BigInt(cwethAmountInWei))
//             .encrypt();
//         console.log({encryptedValue});


//         const encryptedAmount = encryptedValue.handles[0];
//         const inputProof = encryptedValue.inputProof;
//         console.log({encryptedAmount, inputProof});
//         const cWethContractTx = await cWethContract.unwrap(address, address, encryptedAmount, inputProof);
//         const response = await cWethContractTx.wait();
//         console.log(response);
      
//       setConversionSteps2(prev => prev.map(step => 
//         step.step === 1 ? { ...step, status: 'completed' } : step
//       ));

      
//       setCurrentOperation('Withdrawing WETH to ETH...');
//       setConversionSteps2(prev => prev.map(step => 
//         step.step === 2 ? { ...step, status: 'processing' } : step
//       ));

//       // approve weth contract to spend our weth
//       // call withdraw on weth contract (to get back our eth) ,  function withdraw(uint256 amount)
//       const wethContract = new ethers.Contract(
//             Weth.address,
//             Weth.abi,
//             signer
//         );
//       const approveWethTx = await wethContract.approve(Weth.address, cwethAmountInWei);
//       const resp = await approveWethTx.wait();
//       console.log(resp);

//       if(resp) {
//         const withdrawEthTx = await wethContract.withdraw(cwethAmountInWei);
//         const resp2 = await withdrawEthTx.wait();
//         console.log(resp2);
//       }
     
      
//       setConversionSteps2(prev => prev.map(step => 
//         step.step === 2 ? { ...step, status: 'completed' } : step
//       ));

//       setCurrentOperation('Conversion completed successfully!');
//       setCwethAmount('');
      
//     } catch (error) {
//       setConversionSteps2(prev => prev.map(step => 
//         step.status === 'processing' ? { ...step, status: 'error' } : step
//       ));
//       setCurrentOperation('Conversion failed. Please try again.');
//     } finally {
//       setTimeout(() => {
//         setIsConverting(false);
//         setCurrentOperation('');
//         setConversionSteps2([]);
//       }, 3000);
//     }
//   };

  const getStepIcon = (status: ConversionStep['status']) => {
    switch (status) {
      case 'processing':
        return <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>;
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

            {/* Divider */}
            {/* <div className="border-t border-white/20 my-8"></div> */}

            {/* CWETH to ETH Section */}
            {/* <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Wallet className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">CWETH → ETH</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Amount (CWETH)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    value={cwethAmount}
                    onChange={(e) => setCwethAmount(e.target.value)}
                    placeholder="0.0"
                    disabled={isConverting}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                </div>
                
                <button
                  onClick={handleCwethToEth}
                  disabled={isConverting || !cwethAmount}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                           disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl 
                           transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed 
                           disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {isConverting && conversionSteps2.some(step => step.step <= 2) ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{currentOperation}</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="w-5 h-5 rotate-180" />
                      <span>Convert CWETH to ETH</span>
                    </>
                  )}
                </button>
              </div>
            </div> */}

            {/* Progress Steps */}
            {conversionSteps1.length > 0 && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Conversion Progress</h3>
                <div className="space-y-3">
                  {conversionSteps1.map((step) => (
                    <div key={step.step} className="flex items-center space-x-3">
                      {getStepIcon(step.status)}
                      <span className={`text-sm ${
                        step.status === 'completed' ? 'text-green-400' :
                        step.status === 'processing' ? 'text-blue-400' :
                        step.status === 'error' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        Step {step.step}: {step.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {/* {conversionSteps2.length > 0 && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Conversion Progress</h3>
                <div className="space-y-3">
                  {conversionSteps2.map((step) => (
                    <div key={step.step} className="flex items-center space-x-3">
                      {getStepIcon(step.status)}
                      <span className={`text-sm ${
                        step.status === 'completed' ? 'text-green-400' :
                        step.status === 'processing' ? 'text-blue-400' :
                        step.status === 'error' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        Step {step.step}: {step.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Info Section */}
            <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">How it works</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>ETH → CWETH:</strong> First deposits ETH to WETH contract, then wraps WETH to CWETH</p>
                {/* <p><strong>CWETH → ETH:</strong> First unwraps CWETH to WETH, then withdraws WETH to ETH</p> */}
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