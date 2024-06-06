import express from "express";
const router = express.Router();
import { setStatus, getStatus } from "./controllers/setStatus";
import { getForecast } from "./controllers/forecastController";

router.get("/forecast", getForecast);
router.post("/set", setStatus);
router.get("/set", getStatus);

export default router;
