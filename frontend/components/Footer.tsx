
const Footer = () => {

    return (
        <footer className="bg-gradient-deep">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Copyright */}
                <div className="pt-8 border-t border-zinc-800/30 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2025 EmelMarket. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
























// "use client";

// import { useFhe } from '@/components/FheProvider';
// import CWeth from "@/abi/CWeth.json";
// import { useAccount } from 'wagmi';


// export default function Footer() {
//   const fhe = useFhe();
//   const { address } = useAccount();

//   const handleEncrypt = async () => {
//     if (!fhe) return console.log("Still loading...");

//     console.log({fhe});

//     // try this 1
//     const encryptedValue = await fhe
//       .createEncryptedInput(CWeth.address, address)
//       .add64(10)
//       .encrypt();
//     console.log({encryptedValue});

//     // try this 2
//     const encryptedInput = fhe.createEncryptedInput(CWeth.address, address);
//     encryptedInput.addBool(true)
//     encryptedInput.add64(10)
//     const ciphertexts = await encryptedInput.encrypt();
//     console.log("Encrypted:", ciphertexts);

//     // ciphertexts.handles[0], ciphertexts.inputProof
//   };

//   return (
//     <div>
//       <button 
//       onClick={handleEncrypt}

//       >Encrypt Value</button>
//     </div>
//   );
// }
