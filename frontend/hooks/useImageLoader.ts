import { useState, useEffect } from 'react';
import { configDotenv } from 'dotenv';
configDotenv();

const IMAGE_SAMPLE = 'https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i';

export function useImageLoader(imageURI: string) {
  const [imageSrc, setImageSrc] = useState<string>(IMAGE_SAMPLE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!imageURI) {
          setImageSrc(IMAGE_SAMPLE);
          return;
        }

        const src = imageURI.includes('//')
          ? ` https://ipfs.io/ipfs/${imageURI.split('//')[1]}`
          : IMAGE_SAMPLE;
        
        //   const src = imageURI.includes('//')
        //   ? `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${imageURI.split('//')[1]}`
        //   : IMAGE_SAMPLE;

        // const src = imageURI.includes('//')
        //   ? `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${imageURI.split('//')[1]}/?pinataGatewayToken=${process.env.GATEWAY_KEY}`
        //   : IMAGE_SAMPLE;


        // const src = imageURI.includes('//')
        //   ? `https://ipfs.io/ipfs/${imageURI.split('//')[1]}`
        //   : IMAGE_SAMPLE;
        //https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreifvmdhd54eiaep2xl2gdakfagl2azjfxas2bbx2v2xgp6uvryvgh4



        // Pre-load the image
        const img = new Image();
        img.src = src;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setImageSrc(src);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setImageSrc(IMAGE_SAMPLE);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageURI]);

  return { imageSrc, isLoading, error };
}

// import { useState, useEffect } from 'react';

// const IMAGE_SAMPLE = 'path/to/your/sample/image.jpg'; // Replace with your sample image path

// const IPFS_GATEWAYS = [
//   'https://ipfs.io/ipfs/',
//   'https://gateway.pinata.cloud/ipfs/',
//   'https://cloudflare-ipfs.com/ipfs/',
//   'https://gateway.ipfs.io/ipfs/',
//   'https://w3s.link/ipfs/',
//   'https://nftstorage.link/ipfs/'
// ];

// export function useImageLoader(imageURI: string) {
//   const [imageSrc, setImageSrc] = useState<string>(IMAGE_SAMPLE);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [currentGatewayIndex, setCurrentGatewayIndex] = useState(0);

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         if (!imageURI) {
//           setImageSrc(IMAGE_SAMPLE);
//           return;
//         }

//         // Extract IPFS hash from URI
//         const ipfsHash = imageURI.includes('//')
//           ? imageURI.split('//')[1]
//           : imageURI;

//         const src = `${IPFS_GATEWAYS[currentGatewayIndex]}${ipfsHash}`;

//         // Pre-load the image
//         const img = new Image();
//         img.src = src;
        
//         await new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = () => {
//             // Try next gateway if current one fails
//             if (currentGatewayIndex < IPFS_GATEWAYS.length - 1) {
//               setCurrentGatewayIndex(prev => prev + 1);
//               reject(new Error('Gateway failed, trying next one'));
//             } else {
//               reject(new Error('All gateways failed'));
//             }
//           };
//         });

//         setImageSrc(src);
//       } catch (err) {
//         if (currentGatewayIndex < IPFS_GATEWAYS.length - 1) {
//           // If there are more gateways to try, don't set error yet
//           return;
//         }
//         setError(err instanceof Error ? err : new Error('Failed to load image'));
//         setImageSrc(IMAGE_SAMPLE);
//       } finally {
//         if (currentGatewayIndex === IPFS_GATEWAYS.length - 1) {
//           setIsLoading(false);
//         }
//       }
//     };

//     loadImage();
//   }, [imageURI, currentGatewayIndex]);

//   return { imageSrc, isLoading, error };
// }
