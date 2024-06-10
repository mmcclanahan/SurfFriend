import express from "express";
const router = express.Router();
import { createUser, getUser } from "./controllers/userController";
import {
  getFriends,
  createFriendRequest,
} from "./controllers/friendsController";
import { getStatus, setStatus } from "./controllers/statusController";
import { getForecast } from "./controllers/forecastController";

router.get("/forecast", getForecast);
//user routes
router.get("/user/:userId", getUser);
router.post("/user", createUser);
//friend routes
router.get("/friends/:userId", getFriends);
router.post("/friends", createFriendRequest);
//status routes
router.get("/status/:userId", getStatus);
router.post("/status", setStatus);
export default router;
