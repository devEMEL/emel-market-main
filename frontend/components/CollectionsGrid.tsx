import React from 'react';
import { CollectionCard } from './CollectionCard';


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

interface CollectionsProps {
    title: String;
    collections: Collection[];
}

export const CollectionsGrid: React.FC<CollectionsProps> = ({
    title,
    collections,
}) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
        </div>
    );
};
