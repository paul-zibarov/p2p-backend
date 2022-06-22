import { Sequelize } from "sequelize";
import Lot from './models/Lot'
require("dotenv").config();

export const sequelize: Sequelize = new Sequelize(
  'postgres',
  'postgres',
  '1111',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      // ssl: {
      //   require: false,
      //   rejectUnauthorized: false
      // }
    },
    query: {
      raw: true
    },
    define: {
      freezeTableName: true
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 180000,
      idle: 10000
    }
  }
)

export const models = {
    Lot: Lot(sequelize)
}