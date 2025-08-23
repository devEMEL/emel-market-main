import Link from 'next/link';
import React from 'react';
import emelverseLogo from "../app/public/assets/emelverse.jpeg";
import Image from 'next/image';
export const Logo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-lg flex items-center justify-center">
                {/* <span className="text-black font-bold text-xl">ML</span> */}
                <Image src={emelverseLogo} width={50} height={50} alt='emelverse logo' className='w-16 h-12' />
            </div>
            <span className="text-white text-xl font-bold">emelmarket</span>
        </Link>
    );
};
