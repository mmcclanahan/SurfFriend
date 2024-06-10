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
  const id = req.params.userId;
  console.log(typeof id);
  try {
    const status = await UserStatus.findOne({
      where: { id },
    });
    res.status(200).send(status);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user's status");
  }
};
