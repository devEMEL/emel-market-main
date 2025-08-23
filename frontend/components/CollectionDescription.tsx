import React from 'react';

interface CollectionDescriptionProps {
    description: string;
}

export const CollectionDescription: React.FC<CollectionDescriptionProps> = ({
    description,
}) => {
    return (
        <div className="bg-gradient-deep p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
                About Collection
            </h2>
            <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
    );
};
