import { models, sequelize } from '../db';
import { Event } from 'ethers';

export const getAllLots = async () => {
    return await models.Lot.findAll();
}

export const getLots = async (page: number, countPerPage: number) => {
    let offset = (page - 1) * countPerPage
    return await models.Lot.findAll({
        where: {
            status: 0
        },
        order: [['lotId','DESC']],
        limit: countPerPage,
        offset: offset < 0 ? 0 : offset
    })
}

export const getLotById = async (lotId: number) => {
    return await models.Lot.findOne({ where: { lotId } });
}

export const createLot = async (args: any[]) => {
    let e: Event = args[9];
    let block = await e.getBlock();
    await models.Lot.create({
        lotId: args[8],
        status: 0,
        sellerAddress: args[0],
        proposedAssetAddress: args[1].toString(),
        proposedAssetId: args[3].toString(),
        proposedAmount: args[2].toString(),
        askedAssetAddress: args[4],
        askedAssetId: args[6].toString(),
        askedAmount: args[5].toString(),
        txHash: e.transactionHash,
        txHashSuccess: e.transactionHash ? true : false,
        createdAt: block.timestamp
    })
}

export const updateLotStatus = async (lotId: number, status: number, updatedAt: number) => {
    await models.Lot.update({ status, updatedAt }, {
        where: { lotId },
        returning: true
    })
}

export const updateLotBuyer = async (lotId: number, buyerAddress: string) => {
    await models.Lot.update({ buyerAddress }, {
        where: { lotId },
        returning: true
    })
}