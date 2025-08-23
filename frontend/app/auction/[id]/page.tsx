// @ts-nocheck

"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Info, Clock, Tag, Gavel } from 'lucide-react';
import { ethers } from "ethers";
import EmelMarketAbi from "@/abi/EmelMarket.json";
import { useEthersProvider, useEthersSigner } from '@/app/layout';
import { useAccount } from 'wagmi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_LISTING } from '@/mutations/listingsMutations';
import { GET_LISTINGS } from '@/queries/listingsQueries';
import Erc721Abi from "@/abi/Erc721.json";

interface ListingPageProps {
    params: {
        id: string;
    }
}

interface ExistingData {
    listings: any[]
}

const page: React.FC<ListingPageProps> = ({ params }) => {

    const { id } = params;  //
 
    const searchParams = useSearchParams();
    const _nft = searchParams.get("nft");  //
    const nft = JSON.parse(_nft);


    const provider = useEthersProvider();
    const signer = useEthersSigner()
    const { address } = useAccount();

    const [createListing, { loading, error }] = useMutation(CREATE_LISTING, {
        update(cache, { data: { createListing } }) {

          const existingData: ExistingData | null = cache.readQuery({ 
            query: GET_LISTINGS 
          });
          
          if (existingData) {
            const { listings } = existingData;
            cache.writeQuery({
              query: GET_LISTINGS,
              data: { 
                collections: [...listings, createListing]
              },
            });
          }
        },
        onError: (error) => {
          console.error('Create collection error:', error);
        }
      });


    // const isOwner = async () => !!address && address.toUpperCase() === (await contract.ownerOf(tokenIdParam)).toUpperCase();

    const [isOwner, setIsOwner] = useState<boolean>(false);

    const [param, setParam] = useState<string | null>("");
  const [price, setPrice] = useState<string>("");
  const [isAuction, setIsAuction] = useState<boolean>(false);
  const [auctionDuration, setAuctionDuration] = useState<string>("7");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'pending' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

//   
    const [contractAddressParam, tokenIdParam] = [String(id).split("-")[0].trim(), String(id).split("-")[1].trim()];

    const contract = new ethers.Contract(
        contractAddressParam,
        Erc721Abi,
        signer
    );

    const contractRead = new ethers.Contract(
        contractAddressParam,
        Erc721Abi,
        provider
    );



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: 'pending', message: isAuction ? 'Creating auction...' : 'Listing NFT...' });

    try {
      // Simulate transaction
    //   await new Promise(resolve => setTimeout(resolve, 2000));

      if(!isAuction) {
        console.log("LIST NFT");
    

        console.log({mk: EmelMarketAbi.network[0].address});
        console.log({token: BigInt(nft?.tokenId)});
   

        const tx = await contract.approve(String(EmelMarketAbi.network[0].address), BigInt(nft?.tokenId));
        await tx.wait();
        console.log(`Marketplace approved for NFT ${nft?.tokenId}`);

        // NFTCollectionFactory.network[2].address
        const contract2 = new ethers.Contract(
            EmelMarketAbi.network[0].address,
            EmelMarketAbi.abi,
            signer
        );

     

        
        console.log({ca: nft?.contractAddress, tokenId: BigInt( nft?.tokenId), price: ethers.parseEther(price)})
        const listNFT = await contract2.listNFT(nft?.contractAddress, BigInt( nft?.tokenId), ethers.parseEther(String(price)));
        const response = await listNFT.wait();

        console.log(response);
        
     
        const filter = contract2.filters.NFTListed();
        const events = await contract2.queryFilter(filter, response.blockNumber);
        console.log(events);
        

        const eventObj = {
            seller:  events[0].args[3],
            contractAddress: events[0].args[0],
            tokenId: events[0].args[1],
            price: events[0].args[2],
            createdAt: events[0].args[4],

        };
        console.log({eventObj});


        await createListing({variables: {seller: String(eventObj.seller), nftContract: String(eventObj.contractAddress), tokenId: String(eventObj.tokenId), price: String(eventObj.price), createdAt: String(eventObj.createdAt)}})


        // return {
        //     name: eventObj.name,
        //     imageURI: eventObj.imageURI
        // }


      }
      if(isAuction) {
        console.log("Auction nft")
      }


  
      setStatus({ 
        type: 'success', 
        message: isAuction ? 'Auction created successfully!' : 'NFT listed successfully!' 
      });

      //use status for hook to display success or error message
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Transaction failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'pending': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return '';
    }
  };

  useEffect(() => {

    const checkOwner = async () => {
        setIsOwner(!!address && address.toUpperCase() === (await contractRead.ownerOf(tokenIdParam)).toUpperCase())
    }
    checkOwner();

    // get nft from the query 

  }, [address, tokenIdParam, contract]);

  return (
    <>
    { isOwner ? (
        <div className="min-h-screen bg-gradient-deep text-white">
        <button className="flex items-center text-gray-300 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to my NFTs
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-4">
            <img
              src={nft?.collectionImage}
              alt={nft?.tokenName}
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">NFT Details</h2>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Token ID:</span> {tokenIdParam}</p>
                <p><span className="text-gray-400">Contract:</span> {contractAddressParam}</p>
                {/* <p><span className="text-gray-400">Owner:</span> {address}</p> */}
                <p><span className="text-gray-400">Network:</span> {nft?.chainId === String(10143) ? "Monad Testnet" : "--"}</p>
              </div>
            </div>
          </div>
        
          {/* Right Column - Listing Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold">{nft?.tokenName} #{nft?.tokenId}</h1>
              <p className="text-gray-400 mt-2">Configure your listing details below</p>
            </div>
        
            <div className="bg-gray-800/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsAuction(false)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${!isAuction ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Fixed Price
                  </button>
                  <button
                    onClick={() => setIsAuction(true)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isAuction ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Auction
                  </button>
                </div>
              </div>
        
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="price" className="text-lg font-medium">
                      {isAuction ? 'Starting Price' : 'Listing Price'}
                    </label>
                    <div className="flex items-center text-sm text-gray-400">
                      <Info className="w-4 h-4 mr-1" />
                      Service Fee: 5%
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">MON</span>
                  </div>
                </div>
        
                {isAuction && (
                  <div>
                    <label htmlFor="duration" className="flex items-center text-lg font-medium mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Auction Duration
                    </label>
                    <select
                      id="duration"
                      value={auctionDuration}
                      onChange={(e) => {setAuctionDuration(e.target.value); console.log(`Auction duration is ${e.target.value}`); console.log(auctionDuration)}}
                      className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((el, i) => (
                            <option key={el} value={el}>{el} day</option>
                        ))}
                    </select>
                  </div>
                )}
        
                {status.message && (
                  <div className={`p-4 rounded-lg bg-gray-800/50 ${getStatusColor()}`}>
                    {status.message}
                  </div>
                )}
        
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading || !price}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : isAuction ? (
                      "Create Auction"
                    ) : (
                      "List NFT"
                    )}
                  </button>
                  <button
                    type="button"
                    className="px-6 py-4 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
    ) : (<div>You can only list your nft</div>) }
    </> 

  );
};

export default page;

