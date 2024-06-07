//database/db.ts
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB!,
  process.env.USERNAME!,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    logging: false, // Disable logging; default: console.log
  }
);

export default sequelize;
