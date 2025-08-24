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
        let src = "";
      try {
        setIsLoading(true);
        setError(null);

        if (!imageURI) {
          setImageSrc(IMAGE_SAMPLE);
          return;
        }

         if (!imageURI) return;

  // Already an https:// http:// URL → return as is
  if (imageURI.startsWith("http://") || imageURI.startsWith("https://")) {
    src = imageURI;
  }

  // ipfs://<CID> or ipfs://ipfs/<CID>
  if (imageURI.startsWith("ipfs://")) {
    const cid = imageURI.replace("ipfs://", "").replace(/^ipfs\//, "");
    src =  `https://ipfs.io/ipfs/${cid}`;

    // 👆 or swap in your preferred gateway:
    // return https://gateway.pinata.cloud/ipfs/${cid};
  }



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

