import { Network, Workflow } from 'lucide-react';
import MonadImg from '../app/public/assets/monad.jpeg';
import Image from 'next/image';
const Hero = () => {
    const networks = [
        {
            // icon: <Workflow className="w-6 h-6" />,
            icon: <Image src={MonadImg} width={70} height={70} alt='monadImage' className="w-8 h-8" />,
            name: 'Monad Testnet',
        },
        // {
        //     icon: <Network className="w-6 h-6" />,
        //     name: 'Arbitrum Sepolia',
        // },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-black to-zinc-900 h-[50vh] flex items-center mb-10">
            {/* Animated background dots */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0,_transparent_4px)] bg-[length:24px_24px]"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                        Democratize the Creation of NFTs
                    </h1>

                    <p className="text-zinc-400 text-sm md:text-lg mb-8 leading-relaxed">
                        Create and mint unique digital assets with ease.
                    </p>

                    {/* <div className="flex justify-center gap-4 mb-8">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div> */}

                    <div className="flex flex-col items-center">
                        <p className="text-zinc-500 text-sm uppercase tracking-wider mb-3">
                            Supported Networks
                        </p>
                        <div className="flex gap-6 flex-wrap justify-center">
                            {networks.map((network, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
                                >
                                    {network.icon}
                                    <span className="text-white font-medium">
                                        {network.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
