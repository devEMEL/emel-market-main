import { ethers} from 'ethers';
import axios from 'axios';
import { FileObject, PinataSDK } from 'pinata-web3';




const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: 'https://ipfs.io',
});

export const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/119806/emel-market/version/latest";
export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const truncateAddress = (
    address: string,
    startLength = 6,
    endLength = 4
) => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export function getTimeLeft(start: any, end: any) {
  const now = Date.now(); // current timestamp in ms
//   console.log({now});

  let start_ = start * 1000;
  let end_ = end * 1000;
  if (now < start_) return "Event has not started yet.";
  if (now > end_) return "Event already ended.";


  let diff = end_ - now; // time left in ms

  let seconds = Math.floor((diff / 1000) % 60);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export const formatRelativeTime = (timestamp: any) => {
  const now = Date.now();
  const diffInSeconds = Math.floor((timestamp * 1000 - now) / 1000); // positive if future

  if (diffInSeconds >= 0) {
    // Future time → show "time left"
    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec left`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes === 1 ? '' : 's'} left`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours === 1 ? '' : 's'} left`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} left`;

  } else {
    // Past time → show "ago"
    const pastSeconds = Math.abs(diffInSeconds);

    if (pastSeconds < 60) {
      return `${pastSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(pastSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hr' : 'hrs'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
};

export const etherToWei = (amountInEther: string) => {
    return ethers.parseEther(amountInEther);
};

export const weiToEther = (amountInWei: string) => {
    return ethers.formatEther(amountInWei);
};

export const getImageURI = async (imageFile: FileObject) => {
    const upload = await pinata.upload.file(imageFile);
    return `ipfs://${upload.IpfsHash}`;
};

export const getTokenURI = async (metadata: object) => {
    const upload = await pinata.upload.json(metadata);
    return `ipfs://${upload.IpfsHash}`;
};

export const normalizeScientificNotation = (value: string | number): string => {
    // Convert to string and handle scientific notation
    const str = value.toString();
    if (str.includes('e')) {
      const [base, exponent] = str.split('e');
      const exp = parseInt(exponent);
      if (exp > 0) {
        return base.replace('.', '') + '0'.repeat(exp - (base.length - base.indexOf('.') - 1));
      }
    }
    return str;

}


  