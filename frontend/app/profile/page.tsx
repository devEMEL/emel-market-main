// @ts-nocheck
"use client"
import React, { useEffect, useState } from 'react';
import { Wallet, Tag, Gavel, History, ExternalLink } from 'lucide-react';
import { useAccount, useBalance } from 'wagmi';
import Link from 'next/link';
import { Network, Alchemy } from "alchemy-sdk";
import { formatRelativeTime, truncateAddress, getTimeLeft } from '@/utils';
import { SUBGRAPH_URL } from '@/utils';

import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

import AuctionCard from '@/components/AuctionCard';
import MyNFTCard from '@/components/MyNFTCard';
import { useFhe } from '@/components/FheProvider';


type Tab = 'nfts'  | 'auctions' | 'activity';

const query = gql`{
  auctions(first: 100) {
    id
    auctionId
    nftCA
    tokenId
    seller
    startTime
    endTime
    blockNumber
    blockTimestamp
    transactionHash
    status


  }
}`
// use nftCA and tokenId to get name, symbol and uri
const headers = { Authorization: 'Bearer {api-key}' }


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


const alchemy = new Alchemy({
    apiKey: "TajhoIdNGy7RFjvAjEMca", 
    network: Network.ETH_SEPOLIA, 
});

const page = () => {
  const [activeTab, setActiveTab] = useState<Tab>('nfts');
  const [userNFTs, setUserNFTs] = useState<NFT[]>([]);



    const { address } = useAccount();


  const { data } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(SUBGRAPH_URL, query, {}, headers)
    }
  })


 const getUserNFTs = async(alc, add) => {



    // Print total NFT count returned in the response:
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);

    // console.log(nftsForOwner);
    const metadataList: NFT[] = nftsForOwner.ownedNfts.map(async(nft) => {
        const response = await alchemy.nft.getNftMetadata(nft.contract.address, nft.tokenId);
 
        return {
            tokenImage: response.image.originalUrl,
            contractAddress: response.contract.address,
            tokenId: response.tokenId,
            tokenName: response.name,
            tokenSymbol: response.contract.symbol,
            description: response.description,

        }
    });
    // console.log({metadataList});
    return await Promise.all(metadataList);

  }


  const tabs = [
    { id: 'nfts', label: 'My NFTs', icon: Wallet },
    { id: 'auctions', label: 'My Auctions', icon: Gavel },
    { id: 'activity', label: 'My Activity', icon: History }
  ];



  useEffect(() => {
    // console.log({NFTs});
    getUserNFTs(alchemy, address).then(res => setUserNFTs(res));
  })

  const renderNFTGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userNFTs.map((nft, index) => (
        <MyNFTCard 
            key={`${nft.contractAddress}-${nft.tokenId}`}
            nft={nft}
        />
      ))}
    </div>
  );


  const renderAuctions = () => (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.auctions.map((auction: any, index: any) => (
        <AuctionCard
            key={auction.transactionHash}
            isAuctionPage={false}
            auction={auction} 
        />
       ))}
    </div>    
    
  );


  const renderActivity = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="px-6 py-3 text-gray-400">Tx Hash</th>
            <th className="px-6 py-3 text-gray-400">Type</th>
            <th className="px-6 py-3 text-gray-400">NFT ID</th>
            <th className="px-6 py-3 text-gray-400">CA</th>
            <th className="px-6 py-3 text-gray-400">Seller</th>
            <th className="px-6 py-3 text-gray-400">Time</th>
            {/* type = status */}
          </tr>
        </thead>
        
        <tbody>
          {data?.auctions.map((tx, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="px-6 py-4">
                <a href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`} target='blank' className="flex items-center text-blue-400 hover:text-blue-300">
                  {truncateAddress(tx.transactionHash)}
                  <ExternalLink className="w-4 h-4 ml-1"
                   />
                </a>
              </td>
              <td className="px-6 py-4">{tx.status}</td>
              <td className="px-6 py-4">{tx.tokenId}</td>
              <td className="px-6 py-4 font-mono">{truncateAddress(tx.nftCA)}</td>
              <td className="px-6 py-4 font-mono">{truncateAddress(tx.seller)}</td>
              <td className="px-6 py-4">{formatRelativeTime(tx.blockTimestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Profile</h1>
          <div className="flex space-x-2 text-sm">
            <div className="bg-gray-800/30 rounded-lg px-4 py-2">
              {/* <span className="text-gray-400">Balance:</span> */}
              {/* <span className="ml-2">2.5</span> */}
               {/* user balance */}
            </div>
            <div className="bg-gray-800/30 rounded-lg px-4 py-2 font-mono">
              {/* <span className="text-gray-400">Address:</span>  */}
              {/* <span className="ml-2">0x1234...5678</span> */}
               {/* user address */}
            </div>
          </div>
        </div>
            

        <div className="mb-8">
          <nav className="flex space-x-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-6">
          {activeTab === 'nfts' && renderNFTGrid()}
          {activeTab === 'auctions' && renderAuctions()}
          {activeTab === 'activity' && renderActivity()}
        </div>
      </div>
    </div>
  );
};

export default page;