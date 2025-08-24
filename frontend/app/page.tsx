// @ts-nocheck
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, TrendingUp } from 'lucide-react';
import { Network, Alchemy } from "alchemy-sdk";
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { Timer, CheckCircle, XCircle } from 'lucide-react';
import AuctionCard from '@/components/AuctionCard';


interface Collection {
  contractAddress: string;
  name: string;
  coverImage: string;
  itemsListed: number;
}

const alchemy = new Alchemy({
    apiKey: "TajhoIdNGy7RFjvAjEMca", 
    network: Network.ETH_SEPOLIA, 
});

type Tab = 'live'  | 'ended' | 'cancelled';

const query = gql`{
  auctions(first: 5) {
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

const url = 'https://api.studio.thegraph.com/query/119165/emelmarket/version/latest'
const headers = { Authorization: 'Bearer {api-key}' }

const Home: React.FC = () => {

    const [activeTab, setActiveTab] = useState<Tab>('live');

      const tabs = [
        { id: 'live', label: 'Live', icon: Timer },
        { id: 'ended', label: 'Ended', icon: CheckCircle },
        { id: 'cancelled', label: 'Cancelled', icon: XCircle }
      ];

      const { data } = useQuery({
        queryKey: ['data'],
        async queryFn() {
          return await request(url, query, {}, headers)
        }
      })

      const renderLive = () => (
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.auctions.map((auction: any, index: any) => (
                auction.status == "AUCTIONED" && (<AuctionCard
                key={auction.transactionHash}
                isAuctionPage={false}
                auction={auction} 
            />)             
           ))}
        </div>    
        
      );

      const getCurrentTime = () => {
        return Math.floor(Date.now() / 1000);
      }

      const renderEnded = (now: any) => (
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.auctions.map((auction: any, index: any) => (
                Number(auction.endTime) < Number(now) && (<AuctionCard
                key={auction.transactionHash}
                isAuctionPage={false}
                auction={auction} 
            />)             
           ))}
        </div>    
        
      );

      const renderCancelled = () => (
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.auctions.map((auction: any, index: any) => (
                auction.status == "CANCELLED" && (<AuctionCard
                key={auction.transactionHash}
                isAuctionPage={false}
                auction={auction} 
            />)             
           ))}
        </div>    
        
      );

  return (
    <div className="min-h-screen bg-gradient-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">Auctions</h1>
            <p className="text-gray-400 mt-2">Explore NFTs currently auctioned.</p>
        </div>
        <div className="flex items-center space-x-4">
        <div className="bg-gray-800/30 rounded-lg px-4 py-2">
        {/* <span className="text-gray-400">Total Auctions:</span>
        <span className="ml-2 font-semibold">{data?.auctions.length}</span> */}
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
          {activeTab === 'live' && renderLive()}
          {activeTab === 'ended' && renderEnded(getCurrentTime())}
          {activeTab === 'cancelled' && renderCancelled()}
        </div>
      </div>
    </div>
  );
};

export default Home;

