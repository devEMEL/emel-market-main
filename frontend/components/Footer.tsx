import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gradient-deep">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Copyright */}
                <div className="pt-8 border-t border-zinc-800/30 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2024 EmelMarket. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
