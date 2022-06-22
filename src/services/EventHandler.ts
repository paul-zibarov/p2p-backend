import { ethers, Event } from 'ethers'
import environment from '../../endpoints.config'
import { contractsData, providerURL } from '../constants'
import { createLot, updateLotBuyer, updateLotStatus } from '../controllers/LotController';

const provider = new ethers.providers.JsonRpcProvider(providerURL);
const signer = new ethers.Wallet(environment.PK, provider);

let p2p = new ethers.Contract(contractsData.p2p.address, contractsData.p2p.abi, signer)

export const handleNewLotEvents = async () => {
    //address indexed user, 
    // address indexed proposedAsset, 
    // uint proposedAmount, 
    // uint proposedTokenId, 
    // address indexed askedAsset, 
    // uint askedAmount, 
    // uint askedTokenId, 
    // uint deadline, 
    // uint tradeId
    console.log("Start handling 'NewTradeSingle' event.")
    p2p.on("NewTradeSingle", async (...args) => {
        try {
            await createLot(args)
        } catch(e) {
            console.log(e)
        }
    })
}

export const handleBuyLotEvents = async () => {
    //uint indexed tradeId, 
    //address indexed counterparty
    console.log("Start handling 'SupportTrade' event.")
    p2p.on("SupportTrade", async (...args) => {
        try {
            let lotId = args[0];
            let buyerAddress = args[1];
            let e: Event = args[2];
            let block = await e.getBlock();
            let updatedAt = block.timestamp;
            await updateLotStatus(lotId, 1, updatedAt);
            await updateLotBuyer(lotId, buyerAddress);
        } catch(e) {
            console.log(e)
        }
    }) 
}

export const handleCancelLotEvents = async () => {
    //uint indexed tradeId
    console.log("Start handling 'CancelTrade' event.")
    p2p.on("CancelTrade", async (...args) => {
        try {
            let lotId = args[0]
            let e: Event = args[1];
            let block = await e.getBlock();
            let updatedAt = block.timestamp;
            await updateLotStatus(lotId, 2, updatedAt);
        } catch(e) {
            console.log(e)
        }
    }) 
}
