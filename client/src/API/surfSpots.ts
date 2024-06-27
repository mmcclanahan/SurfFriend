import axios from "axios";
import { SurfSpot } from "../types/types";
import { URL } from "../config";

export const getAllSurfSpots = async (userId: number) => {
  const { data } = await axios.get(`${URL}/spots/${userId}`);
  return data;
};

export const createSurfSpot = async (surfSpot: SurfSpot) => {
  const { data } = await axios.post(`${URL}/spots`, surfSpot);
  return data;
};

export const incrementSurfSpot = async (id: number) => {
  const { data } = await axios.put(`${URL}/spots/${id}`);
  return data;
};
