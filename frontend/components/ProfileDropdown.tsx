// @ts-nocheck
import Link from 'next/link';
import React, { useState } from 'react';

export const ProfileDropdown: React.FC = ({ className }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative">
            {isOpen && (
                <div className={className}>
                    <div className="flex flex-col items-start">
                        <Link
                            href="/profile/nfts"
                            className="block px-4 py-2 text-black hover:bg-white/10"
                        >
                            My NFTs
                        </Link>
                        <Link
                            href="/profile/collections"
                            className="block px-4 py-2 text-black hover:bg-white/10"
                        >
                            My Collections
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
