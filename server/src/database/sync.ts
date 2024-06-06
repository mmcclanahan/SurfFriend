import sequelize from "./db";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import Friend from "../models/Friend";

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

syncDb();
