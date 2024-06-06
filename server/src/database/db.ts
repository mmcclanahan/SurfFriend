import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Disable logging; default: console.log
});

export default sequelize;
