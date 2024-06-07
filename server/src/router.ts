import express from "express";
const router = express.Router();
import { createUser, getUser } from "./controllers/userController";
import { getForecast } from "./controllers/forecastController";

router.get("/forecast", getForecast);
//user routes
router.post("/user", createUser);
router.get("/user", getUser);

export default router;
