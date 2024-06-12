import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import sequelize from "./database/db";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());

app.use(router);

const startServer = async () => {
  try {
    //await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    await sequelize.authenticate();
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
