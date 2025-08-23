import React from 'react';
import { X } from 'lucide-react';
import { useImageLoader } from '@/hooks/useImageLoader';

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    nftName: string;
    imageUrl: string;
    title: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
    isOpen,
    onClose,
    nftName,
    imageUrl,
    title,
}) => {
    if (!isOpen) return null;

    const { imageSrc, isLoading } = useImageLoader(imageUrl);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-deep">
            <div className="relative bg-gradient-deep text-white rounded-lg max-w-md w-full p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="text-center">
                    <h2 className="text-xl font-bold mb-8">{title}</h2>

                    <div className="mb-8">
                        <img
                            src={
                                imageSrc ||
                                'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1000'
                            }
                            alt={nftName}
                            className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 w-full h-80 object-cover rounded-lg`}
                            // className="w-full h-80 object-cover rounded-lg"
                        />
                    </div>

                    <p className="text-lg font-semibold text-white">
                        {nftName || 'Bored Ape'}
                    </p>
                </div>
            </div>
        </div>
    );
};
