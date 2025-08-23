// @ts-nocheck
'use client';
import { getTokenURI, weiToEther } from '@/utils';
import { ethers } from 'ethers';
import React, { FormEvent, useState } from 'react';
import NFTCollection from '@/abi/NFTCollection.json';
import { useEthersProvider, useEthersSigner } from '@/app/layout';
import { useAccount, useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';
import { CREATE_NFT } from '@/mutations/nftMutations';
import { GET_NFTS } from '@/queries/nftQueries';
import { useToastify } from '@/hooks/useToastify';
import { useErrorPopup } from '@/hooks/useErrorPopup';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SuccessPopup } from './popups/SuccessPopup';
import { ErrorPopup } from './popups/ErrorPopup';
import { ToastPopup } from './popups/ToastPopup';
import { UPDATE_COLLECTION } from '@/mutations/collectionMutations';
import { GET_COLLECTIONS } from '@/queries/collectionQueries';

interface Collection {
    id: string;
    chainId: string;
    name: string;
    symbol: string;
    description: string;
    ownerAddress: string;
    createdAt: string;
    price: string;
    imageUrl: string;
    totalSupply: string;
    mintedAmount: string;
}

interface ExistingData {
    collections: any[]
}

interface MintButtonProps {
    collection: Collection;
    isOpen: boolean;
    onClose: () => void;
    disabled?: boolean;
    openPopup: () => void;
}

export const MintButton: React.FC<MintButtonProps> = ({
    collection,
    isOpen,
    onClose,
    disabled,
    openPopup,
}) => {



    // const { isOpen, openPopup, closePopup } = usePopup();
    const { isOpen: isToastOpen, openPopup: openToastPopup, closePopup: closeToastPopup } = useToastify();
    const { isOpen: isErrorOpen, openPopup: openErrorPopup, closePopup: closeErrorPopup } = useErrorPopup();

    const [errorMessage, setErrorMessage] = useState<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit libero optio adipisci eos atque culpa corporis error eum maxime suscipit quibusdam, veritatis et laborum pariatur quod, alias in nobis magnam.");
    const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");
    const [eventName, setEventName] = useState<string>("");
    const [eventImageUrl, setEventImageUrl] = useState<string>("");

    const provider = useEthersProvider();
    const signer = useEthersSigner();
    const { address } = useAccount();
    const chainId = 10143;

    const [createNFT, { loading, error }] = useMutation(CREATE_NFT, {
        update(cache, { data: { createNFT } }) {
          const existingData = cache.readQuery({ 
            query: GET_NFTS
          });
          
          if (existingData) {
            const { nfts } = existingData;
            cache.writeQuery({
              query: GET_NFTS,
              data: { 
                nfts: [...nfts, createNFT]
              },
            });
          }
        },
        onError: (error) => {
          console.error('Create nft error:', error);
        }
      });

      const [updateCollection, { loading: upl, error: upe }] = useMutation(UPDATE_COLLECTION, {
        update(cache, { data: { updateCollection } }) {
          const existingData: ExistingData | null = cache.readQuery({
            query: GET_COLLECTIONS,
          });
      
          if (existingData) {
            const { collections } = existingData;
      
            // Replace the updated collection in the array
            const updatedCollections = collections.map((collection) =>
              collection.id === updateCollection.id ? updateCollection : collection
            );
      
            cache.writeQuery({
              query: GET_COLLECTIONS,
              data: {
                collections: updatedCollections,
              },
            });
          }
        },
        onError: (error) => {
          console.error('Update Collection error:', error);
        },
      });

    const handleMintCollection = async () => {
        console.log('Minting NFT...');

        const contract = new ethers.Contract(
            collection.id,
            NFTCollection.abi,
            signer
        );
        // make txn

        setLoadingMessage("Pinning Metadata to IPFS")
        openToastPopup()
        // prepare tokenURI
        const metadata = {
            name: collection.name, // next time
            description: collection.description,
            image: collection.imageUrl,
        };
        console.log(metadata);
        const tokenURI = await getTokenURI(metadata);
        console.log({tokenURI});

        setLoadingMessage("Minting NFT ...")
        const tx = await contract.mintNFT(tokenURI, { value: BigInt(collection.price), });
        const response = await tx.wait();
        console.log(response);
        
        // read event log
        const filter = contract.filters.NFTCreated();
        const events = await contract.queryFilter(filter, response.blockNumber);
        console.log(events);

        const eventObj = {
            chainId,
            collectionAddress: events[0].args[0],
            owner: events[0].args[1],
            name: events[0].args[2],
            symbol: events[0].args[3],
            description: events[0].args[4],
            tokenId: Number(String(events[0].args[5])),
            createdAt: Number(String(events[0].args[6])),
            imageUrl: collection.imageUrl,
        };
        console.log(eventObj);

        await createNFT({variables: {chainId: String(chainId), name: String(eventObj.name), symbol: String(eventObj.symbol), description: String(eventObj.description), collectionAddress: String(eventObj.collectionAddress), tokenId: String(eventObj.tokenId), ownerAddress: String(eventObj.owner), mintedAt: String(eventObj.createdAt), imageUrl: String(eventObj.imageUrl)}});
        //increment collection's mintedAmount
        console.log({id: String(eventObj.collectionAddress)})
        await updateCollection({ variables: { id: String(eventObj.collectionAddress) }});


        return {
            name: eventObj.name,
            tokenId: eventObj.tokenId,
            imageURI: eventObj.imageUrl,
        }
    }
    const mintCollection = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { name, tokenId, imageURI } = await handleMintCollection();
                    
            setEventName(`${name} #${tokenId}`);
            // imageURIToSrc
            setEventImageUrl(imageURI);

            closeToastPopup();

            // display success popup (define the image url and name)
            openPopup();
        } catch(err) {
            // close toast
            closeToastPopup();
            console.log({errorMessage: err})
            setErrorMessage(String(err));
            openErrorPopup();
            console.log(err);
        } finally {

        }
    };

    return (
        <div>

<SuccessPopup
                    isOpen={isOpen}
                    onClose={onClose}
                    nftName={eventName}
                    imageUrl={eventImageUrl}
                    title="NFT Minted Successfully!"
                />
                <ErrorPopup
                    isOpen={isErrorOpen}
                    onClose={closeErrorPopup}
                    message={errorMessage}
                 />
                 <ToastPopup
                      isVisible={isToastOpen}
                      message={loadingMessage}
                     
                 />

<button
            onClick={address && mintCollection}
            disabled={disabled}
            className="w-full bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors flex justify-center"
        >
            
            {address ? `Mint for ${weiToEther(String(collection.price))} MON` : <ConnectButton />}
        </button>
        </div>
        
    );
};
