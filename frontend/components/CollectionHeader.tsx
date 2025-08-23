import Link from 'next/link';
import React from 'react';

interface CollectionHeaderProps {
    name: string;
    imageUrl: string;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
    name,
    imageUrl,
}) => {
    return (
        <div className="relative">
            <Link
                href="/"
                className="absolute top-4 left-4 text-white hover:text-gray-200 z-10"
            >
                ← Back to collections
            </Link>
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h1 className="text-4xl font-bold text-white">{name}</h1>
            </div>
        </div>
    );
};
