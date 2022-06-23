import express from 'express'

import { handleNewLotEvents, handleBuyLotEvents, handleCancelLotEvents } from "./services/EventHandler";
import { sequelize } from "./db"
import { getAllActiveLotsCount, getLotById, getLots } from './controllers/LotController';

const app = express()
const port = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send({
        status: "Working" 
    });
})

app.get('/getActiveLotsCount', async (req, res) => {
    try {
        let count = await getAllActiveLotsCount();
        res.send({
            count
        })
    } catch(e) {
        console.log(e)
    }
})

app.get('/getActiveLots', async (req, res) => {
    try {
        let lots = await getLots(Number(req.query.page), Number(req.query.countPerPage));
        res.send(lots)
    } catch(e) {
        console.log(e)
    }
})

app.get('/getLotById', async (req, res) => {
    try {
        let lot = await getLotById(Number(req.query.id));
        res.send(lot)
    } catch(e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

sequelize.sync().then(() => {
    console.log('Synchronized.');
})

handleNewLotEvents();
handleBuyLotEvents();
handleCancelLotEvents();
