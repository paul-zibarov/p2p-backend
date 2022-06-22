import { bep1155ABI, bep20ABI, bep721ABI, p2pABI } from './abis/abis'

export const contractsData = {
    t20: {
        address: "0xD44348AEeA736DFC368C51F6FD1805cB6E111AF0",
        abi: bep20ABI
    },
    t721: {
        address: "0xC7cd77CCF59b7D9dd38E231afafF48AC0e331916",
        abi: bep721ABI 
    },
    t1155: {
        address: "0xD128aFe7e7ccFcc6121cc071d342e886B23A5cF9",
        abi: bep1155ABI 
    },
    p2p: {
        address: "0xB5638c4b76325f4E95fa84A39BA0Fa2828457B35",
        abi: p2pABI 
    }
    
};

export const providerURL = 'https://data-seed-prebsc-2-s3.binance.org:8545/'