import React from 'react';
import { formatRelativeTime, truncateAddress, weiToEther } from '../utils/index';
import Link from 'next/link';
import { useImageLoader } from '@/hooks/useImageLoader';

interface Collection {
    id: string;
    chainId: string;
    name: string;
    symbol: string;
    description: string;
    ownerAddress: string;
    createdAt: string;
    price: string;
    imageUrl: string;
    totalSupply: string;
    mintedAmount: string;
}

interface CollectionCardProps {
    collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    collection,
}) => {

    
    const { imageSrc, isLoading, error } = useImageLoader(collection.imageUrl);


    return (
        <div className="bg-gradient-deep rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
            <Link
                href={`/collection/${collection.id}`}
                className="block bg-gradient-deep rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
            >
                <img
                    src={imageSrc}
                    alt={collection.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                        {collection.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-1">
                        Contract: {truncateAddress(collection.id)}
                    </p>
                    <p className="text-sm text-white/80 mb-1">
                        Created:{' '}
                        {/* {new Date(collection.createdAt).toLocaleDateString()} */}
                        {formatRelativeTime(collection.createdAt)}
                    </p>
                    <p className="text-sm font-medium text-white">
                        {weiToEther(String(collection.price))} MON
                    </p>
                </div>
            </Link>
        </div>
    );
};
