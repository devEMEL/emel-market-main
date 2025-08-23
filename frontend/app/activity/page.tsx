"use client"
import React, { useState } from 'react';
import { Wallet, Tag, Gavel, History, ExternalLink, Clock } from 'lucide-react';


interface Transaction {
  hash: string;
  type: 'Sale' | 'Purchase' | 'Bid' | 'List' | 'Cancel';
  nftId: string;
  collectionAddress: string;
  seller: string;
  price: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const page = () => {


  const mockTransactions: Transaction[] = [
    {
      hash: "0xabcd...efgh",
      type: "Sale",
      nftId: "123",
      collectionAddress: "0x1234...5678",
      seller: "0xabcd...efgh",
      price: "0.5",
      timestamp: "2024-03-15 14:30:00",
      status: "Completed"
    },
    {
        hash: "0xabcd...efgh",
        type: "Sale",
        nftId: "123",
        collectionAddress: "0x1234...5678",
        seller: "0xabcd...efgh",
        price: "0.5",
        timestamp: "2024-03-15 14:30:00",
        status: "Failed"
      }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400';
      case 'Pending': return 'text-yellow-400';
      case 'Failed': return 'text-red-400';
      default: return 'text-white';
    }
  };


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
            <th className="px-6 py-3 text-gray-400">Price (ETH)</th>
            <th className="px-6 py-3 text-gray-400">Time</th>
            <th className="px-6 py-3 text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
              <td className="px-6 py-4">
                <a href="#" className="flex items-center text-blue-400 hover:text-blue-300">
                  {tx.hash}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </td>
              <td className="px-6 py-4">{tx.type}</td>
              <td className="px-6 py-4">{tx.nftId}</td>
              <td className="px-6 py-4 font-mono">{tx.collectionAddress}</td>
              <td className="px-6 py-4 font-mono">{tx.seller}</td>
              <td className="px-6 py-4">{tx.price}</td>
              <td className="px-6 py-4">{tx.timestamp}</td>
              <td className={`px-6 py-4 ${getStatusColor(tx.status)}`}>{tx.status}</td>
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
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Activity</h1>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-6">
          {renderActivity()}
        </div>
      </div>
    </div>
  );
};

export default page;