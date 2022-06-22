import { sequelize } from "./db"   

sequelize.sync().then(() => {
    console.log('Synchronized.');
})

