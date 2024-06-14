import { Request, Response } from "express";
import UserStatus from "../models/UserStatus";

export const updateStatus = async (req: Request, res: Response) => {
  const { userId, status, location, rating } = req.body;
  try {
    const newStatus = await UserStatus.update(
      {
        userId,
        status,
        location,
        rating,
      },
      { where: { userId } }
    );
    res.status(200).send(newStatus);
  } catch (error) {
    res.status(500).send(error);
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
