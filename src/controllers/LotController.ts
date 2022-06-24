import { models, sequelize } from '../db';
import { Event } from 'ethers';

export const getAllActiveLots = async () => {
    return await models.Lot.findAll({ where: { status: 0 } });
}

export const getAllActiveLotsCount = async () => {
    return await models.Lot.count({ where: { status: 0 } });
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

export const getOwnerLots = async (owner: string, page: number, countPerPage: number) => {
    let offset = (page - 1) * countPerPage;
    return await models.Lot.findAll({ 
        where: { 
            sellerAddress: owner,
            status: 0
        },
        order: [['lotId','DESC']],
        limit: countPerPage,
        offset: offset < 0 ? 0 : offset 
    });
}

export const getOwnerActiveLotsCount = async (owner: string) => {
    return await models.Lot.count({ where: { sellerAddress: owner, status: 0 }});
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
        askedAmount: Number(args[5] / 10 ** 18),
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