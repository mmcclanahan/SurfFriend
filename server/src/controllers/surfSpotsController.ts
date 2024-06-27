import { Request, Response } from "express";
import SurfSpot from "../models/SurfSpot";

export const getAllUserSurfSpots = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const surfSpots = await SurfSpot.findAll({
      where: { userId },
    });
    res.status(200).send(surfSpots);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createSurfSpot = async (req: Request, res: Response) => {
  try {
    const { userId, name, city } = req.body;
    const newSurfSpot = await SurfSpot.create({
      userId,
      name,
      city,
      timesSurfed: 0,
    });
    res.status(201).send(newSurfSpot);
  } catch (error) {
    res.status(500).send(error);
  }
};

//increment times surfed to surfspot
export const incrementSurfSpot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const surfSpot = await SurfSpot.findByPk(id);
    if (surfSpot) {
      surfSpot.timesSurfed += 1;
      await surfSpot.save();
      res.status(200).send(surfSpot);
    } else {
      res.status(404).send("Surf spot not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
