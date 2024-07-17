import express from "express";
const router = express.Router();
import { createUser, getUser } from "./controllers/userController";
import {
  getFriends,
  createFriendRequest,
  deleteFriend,
  comfirmFriendRequest,
} from "./controllers/friendsController";
import { getStatus, updateStatus } from "./controllers/statusController";
import {
  getSessionsForMonth,
  createSession,
  getAllSessions,
} from "./controllers/sessionsController";
import {
  getAllUserSurfSpots,
  createSurfSpot,
  incrementSurfSpot,
  deleteSurfSpot,
} from "./controllers/surfSpotsController";
import { getForecast } from "./controllers/forecastController";

router.get("/forecast", getForecast);
//user routes
router.get("/user/:userId", getUser);
router.post("/user", createUser);
//friend routes
router.get("/friends/:userId", getFriends);
router.post("/friends", createFriendRequest);
router.put("/friends", comfirmFriendRequest);
router.delete("/friends", deleteFriend);
//status routes
router.get("/status/:userId", getStatus);
router.put("/status", updateStatus);
//session routes
router.get("/sessions/:userId", getAllSessions);
router.get("/sessions/:userId/:monthNumber", getSessionsForMonth);
router.post("/sessions", createSession);
//router.delete("/sessions", deleteSession);
//surf spot routes
router.get("/spots/:userId", getAllUserSurfSpots);
router.post("/spots", createSurfSpot);
router.put("/spots/:id", incrementSurfSpot);
router.delete("/spots/:id", deleteSurfSpot);

export default router;
