import express from 'express'
import bodyParser from 'body-parser';

import { handleNewLotEvents, handleBuyLotEvents, handleCancelLotEvents } from "./services/EventHandler";
import { sequelize } from "./db"
import { getLotById, getLots } from './controllers/LotController';

const app = express()
const jsonParser = bodyParser.json();
const port = process.env.PORT_API || 5000;

app.get('/getLots', jsonParser, async (req, res) => {
    try {
        let lots = await getLots(req.body.page, req.body.countPerPage);
        res.send(lots)
    } catch(e) {
        console.log(e)
    }
})

app.get('/getLotById', jsonParser, async (req, res) => {
    try {
        let lot = await getLotById(req.body.lotId);
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
