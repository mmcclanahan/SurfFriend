import { Request, Response } from "express";
import { fetchCurrentConditions } from "../services/fetchCurrentConditions";

export const getForecast = async (req: Request, res: Response) => {
  try {
    const forecast = await fetchCurrentConditions();
    res.status(200).send(forecast);
  } catch (error) {
    res
      .status(500)
      .send(`An error occurred while fetching the forecast. Error: ${error}`);
  }
};
