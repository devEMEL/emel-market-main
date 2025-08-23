// @ts-nocheck
'use client';
import React from 'react';
import { Tag, TrendingUp, Clock, DollarSign, BarChart3 } from 'lucide-react';

interface CollectionStats {
  name: string;
  coverImage: string;
  contractAddress: string;
  itemsListed: number;
  itemsSold: number;
  volumeUSD: number;
}

interface ListedNFT {
  image: string;
  name: string;
  tokenId: string;
  owner: string;
  listedAt: string;
  price: string;
}

const page = ({params}: any) => {

  const { contractAddress } = params;

  const mockStats: CollectionStats = {
    name: "Cosmic Wanderers",
    coverImage: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop",
    contractAddress: contractAddress || "0x1234...5678",
    itemsListed: 5,
    itemsSold: 12,
    volumeUSD: 15750.50
  };

  const mockListedNFTs: ListedNFT[] = [
    {
      image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&auto=format&fit=crop",
      name: "Cosmic Wanderer #123",
      tokenId: "123",
      owner: "0xabcd...efgh",
      listedAt: "3 hours ago",
      price: "0.5 ETH"
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop",
      name: "Cosmic Wanderer #124",
      tokenId: "124",
      owner: "0x1234...5678",
      listedAt: "5 hours ago",
      price: "0.75 ETH"
    }
  ];

  const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
    <div className="bg-gray-800/30 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <Icon className="w-5 h-5 text-blue-400 mr-2" />
        <span className="text-gray-400">{label}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Header */}
        <div className="relative h-64 rounded-xl overflow-hidden mb-8">
          <img
            src={mockStats.coverImage}
            alt={mockStats.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <h1 className="text-4xl font-bold mb-2">{mockStats.name}</h1>
            <p className="text-gray-400">Contract: {mockStats.contractAddress}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Floor Price" value="0.5 ETH" />
          <StatCard icon={Tag} label="Listed Items" value={mockStats.itemsListed} />
          <StatCard icon={TrendingUp} label="Items Sold" value={mockStats.itemsSold} />
          <StatCard icon={BarChart3} label="Total Volume" value={`$${mockStats.volumeUSD.toLocaleString()}`} />
        </div>

        {/* Listed NFTs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Listed NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListedNFTs.map((nft, index) => (
              <div key={index} className="bg-gray-800/30 rounded-lg overflow-hidden">
                <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{nft.name}</h3>
                    <p className="text-gray-400 text-sm">Token ID: {nft.tokenId}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Owner:</span>
                      <span className="font-mono">{nft.owner}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Listed:</span>
                      <span>{nft.listedAt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-400 font-semibold">{nft.price}</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;