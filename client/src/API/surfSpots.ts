import axios from "axios";
import { SurfSpot } from "../types/types";
import { URL } from "../config";

export const getAllSurfSpots = async (userId: number) => {
  const { data } = await axios.get(`${URL}/spots/${userId}`);
  return data;
};

export const createSurfSpot = async (surfSpot: SurfSpot) => {
  try {
    const { data } = await axios.post(`${URL}/spots`, surfSpot);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const incrementSurfSpot = async (id: number) => {
  const { data } = await axios.put(`${URL}/spots/${id}`);
  return data;
};

export const deleteSurfSpot = async (id: number) => {
  const { data } = await axios.delete(`${URL}/spots/${id}`);
  return data;
};
