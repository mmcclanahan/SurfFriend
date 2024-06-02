import express from "express";
const router = express.Router();

import { getForecast } from "./controllers/forecastController";

router.get("/forecast", getForecast);

export default router;
