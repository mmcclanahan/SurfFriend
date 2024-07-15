import axios from "axios";
import { URL } from "../config";
import { StatusForm } from "../types/types";

export const getStatus = async (userId: number) => {
  const { data } = await axios.get(`${URL}/status/${userId}`);
  return data;
};

export const updateStatus = async (userId: number, StatusForm: StatusForm) => {
  const { data } = await axios.put(`${URL}/status`, {
    userId,
    status: StatusForm.status,
    city: StatusForm.city,
    spotName: StatusForm.spotName,
    rating: StatusForm.rating,
  });
  return data;
};
