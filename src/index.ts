import { handleNewLotEvents, handleBuyLotEvents, handleCancelLotEvents } from "./services/EventHandler";
import { sequelize } from "./db"

sequelize.sync().then(() => {
    console.log('Synchronized.');
})

handleNewLotEvents();
handleBuyLotEvents();
handleCancelLotEvents();
