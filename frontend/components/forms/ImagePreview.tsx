import React from 'react';

interface ImagePreviewProps {
    file: File | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
    if (!file) return null;

    const imageUrl = URL.createObjectURL(file);

    return (
        <div className="mt-2">
            <img
                src={imageUrl}
                alt="Collection preview"
                className="w-full h-48 object-cover rounded-lg"
                onLoad={() => URL.revokeObjectURL(imageUrl)}
            />
        </div>
    );
};
