import { Request, Response } from "express";
import axios from "axios";
import SurfSpot from "../models/SurfSpot";
import dotenv from "dotenv";
dotenv.config();

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
    const { userId, spotName, city } = req.body;
    const validCity = await axios.get(
      process.env.CITYCHECK_URL +
        `placename=${city}` +
        process.env.CITYCHECK_API_KEY
    );
    if (validCity.data.postalCodes.length === 0 || !validCity.data) {
      res.status(400).send("Unable to find city. Please enter a valid city.");
      return;
    }
    const newSurfSpot = await SurfSpot.create({
      userId,
      spotName,
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

export const deleteSurfSpot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const surfSpot = await SurfSpot.findByPk(id);
    if (surfSpot) {
      await surfSpot.destroy();
      res.status(200).send("Surf spot deleted");
    } else {
      res.status(404).send("Surf spot not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
