import React from 'react';
import { formatRelativeTime, truncateAddress, weiToEther } from '../utils/index';
import Link from 'next/link';

interface CollectionStatsProps {
    contractAddress: string;
    ownerAddress: string;
    createdAt: string;
    price: number;
    mintedAmount: number;
    totalSupply: number;
}

export const CollectionStats: React.FC<CollectionStatsProps> = ({
    contractAddress,
    ownerAddress,
    createdAt,
    price,
    mintedAmount,
    totalSupply,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Contract Address
                </h3>
                <p className="text-white font-mono">
                    <Link href={`https://testnet.monadexplorer.com/address/${contractAddress}`}  target='blank'>{truncateAddress(contractAddress)}</Link>
                    
                </p>
            </div>
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Owner Address
                </h3>
                <p className="text-white font-mono">
                <Link  href={`https://testnet.monadexplorer.com/address/${ownerAddress}`}  target='blank'>{truncateAddress(ownerAddress)}</Link>
                </p>
            </div>
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Created
                </h3>
                <p className="text-white">
                    {formatRelativeTime(createdAt)}
                </p>
            </div>
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Price
                </h3>
                <p className="text-white">{weiToEther(String(price))} MON</p>
            </div>
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Minted
                </h3>
                <p className="text-white">
                    {mintedAmount || 0} / {totalSupply || 0}
                </p>
            </div>
            <div className="bg-gradient-deep p-4 rounded-lg">
                <h3 className="text-sm font-medium text-white/60 mb-1">
                    Progress
                </h3>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div
                        className="bg-white h-2.5 rounded-full"
                        style={{
                            width: `${(mintedAmount / totalSupply) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
