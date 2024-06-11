import { Request, Response } from "express";
import UserStatus from "../models/UserStatus";

export const setStatus = async (req: Request, res: Response) => {
  const { status, location, rating, userId } = req.body;
  try {
    const newStatus = await UserStatus.create({
      status,
      location,
      rating,
      userId,
    });
    res.status(200).send(newStatus);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const status = await UserStatus.findOne({
      where: { userId: userId },
    });
    if (!status) {
      res.status(404).send("Status not found");
      return;
    }
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send(error);
  }
};
