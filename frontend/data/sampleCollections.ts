export interface Collection {
    id: string;
    name: string;
    contractAddress: string;
    createdAt: string;
    price: number;
    imageUrl: string;
    description: string;
}

export interface NFT {
    name: string;
    symbol: String;
    contractAddress: string;
    owner: string;
    imageUrl: string;
}

export const NFTs: NFT[] = [
    {
        name: 'Bored Ape Yacht Club',
        symbol: 'BAYC',
        contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        owner: '0xbahvhsdjjalfhinvkkiairieijvnbkavhnooo59884884',
        imageUrl:
            'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1000',
    },
    {
        name: 'Bored Ape Yacht Club',
        symbol: 'BAYC',
        contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        owner: '0xbahvhsdjjalfhinvkkiairieijvnbkavhnooo59884884',
        imageUrl:
            'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1000',
    },
    {
        name: 'Bored Ape Yacht Club',
        symbol: 'BAYC',
        contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        owner: '0xbahvhsdjjalfhinvkkiairieijvnbkavhnooo59884884',
        imageUrl:
            'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1000',
    },
];

export const collections: Collection[] = [
    {
        id: '1',
        name: 'Bored Ape Yacht Club',
        contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        createdAt: '2023-04-15',
        price: 80.5,
        imageUrl:
            'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '2',
        name: 'CryptoPunks',
        contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
        createdAt: '2023-05-20',
        price: 65.2,
        imageUrl:
            'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '3',
        name: 'Doodles',
        contractAddress: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        createdAt: '2023-06-01',
        price: 12.8,
        imageUrl:
            'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '4',
        name: 'Azuki',
        contractAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        createdAt: '2023-06-15',
        price: 15.7,
        imageUrl:
            'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '5',
        name: 'CloneX',
        contractAddress: '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B',
        createdAt: '2023-07-01',
        price: 8.9,
        imageUrl:
            'https://i.seadn.io/gae/XN0XuD8Uh3jyRWGtDDL8DHZv1XKOZABytTa7II3qRREB7JawSfeiQz3kiju5J7m06xNXqxo3Q50vlwaFTaUJgZMPrlyB8LsAZZ9k?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '6',
        name: 'Moonbirds',
        contractAddress: '0x23581767a106ae21c074b2276D25e5C3e136a68b',
        createdAt: '2023-07-15',
        price: 7.2,
        imageUrl:
            'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '7',
        name: 'World of Women',
        contractAddress: '0xe785E82358879F061BC3dcAC6f0444462D4b5330',
        createdAt: '2023-08-01',
        price: 3.4,
        imageUrl:
            'https://i.seadn.io/gae/EFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '8',
        name: 'Cool Cats',
        contractAddress: '0x1A92f7381B9F03921564a437210bB9396471050C',
        createdAt: '2023-08-15',
        price: 2.8,
        imageUrl:
            'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '9',
        name: 'VeeFriends',
        contractAddress: '0xa3AEe8BcE55BEeA1951EF834b99f3Ac60d1ABeeB',
        createdAt: '2023-09-01',
        price: 5.1,
        imageUrl:
            'https://i.seadn.io/gae/5y-UCAXiNOFXH551w5bWdZEYOCdHPwbqmcKb-xa3uVQEjQgxvih3HtZWSmzqDqd0uk7kIqFrZhw32Gt6xPBFg4t_n9BKhpou-dwnOg?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
    {
        id: '10',
        name: 'Pudgy Penguins',
        contractAddress: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
        createdAt: '2023-09-15',
        price: 4.2,
        imageUrl:
            'https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&w=1000',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione repudiandae non tempore temporibus deserunt. Deserunt maiores consequuntur nesciunt iste quos, ratione omnis ipsum consectetur suscipit repellendus perferendis aliquid ut delectus!',
    },
];
