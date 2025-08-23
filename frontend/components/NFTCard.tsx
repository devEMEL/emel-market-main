import React from 'react';
import { truncateAddress } from '@/utils';
import { useImageLoader } from '@/hooks/useImageLoader';

interface NFT {
    id: string;
    chainId: string;
    name: string;
    symbol: string;
    description: string;
    collectionAddress: string;
    tokenId: string;
    ownerAddress: string;
    mintedAt: string;
    imageUrl: string;
}

interface NFTProps {
    nft: NFT;
}

const NFTCard: React.FC<NFTProps> = ({ nft }) => {

    const { imageSrc, isLoading, error } = useImageLoader(nft.imageUrl);
    return (
        <div className="bg-gradient-deep rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
            <div className="block bg-gradient-deep rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
                <img
                    src={imageSrc}
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                        {nft.name} #{nft.tokenId}
                    </h3>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                        {nft.symbol}
                    </h3>
                    <p className="text-sm text-white/80 mb-1">
                        Contract: {truncateAddress(nft.collectionAddress)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
