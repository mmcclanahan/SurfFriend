import { Request, Response } from "express";
import Session from "../models/Session";

//find by current year and month implicitly include year because month is included explicitly by user from front end
export const getSessionsForMonth = async (req: Request, res: Response) => {
  const { userId, monthNumber } = req.params;
  try {
    const sessions = await Session.findAll({
      where: { userId, monthNumber },
    });
    res.status(200).send(sessions);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.findAll({
      where: { userId },
    });
    res.status(200).send(sessions);
  } catch (error) {
    res.status(500).send;
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { userId, session } = req.body;
  try {
    const newSession = await Session.create({
      userId,
      city: session.city,
      spotName: session.spotName,
      rating: session.rating,
      diary: session.diary,
      //conditions: session.conditions,
    });
    res.status(200).send(newSession);
  } catch (error) {
    res.status(500).send(error);
  }
};
