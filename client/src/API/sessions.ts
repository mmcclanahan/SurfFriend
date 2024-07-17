import axios from "axios";
import { URL } from "../config";
import { Session } from "../types/types";

export const getAllSessions = async (userId: number) => {
  const { data } = await axios.get(`${URL}/sessions/${userId}`);
  return data;
};

export const createSession = async (userId: number, session: Session) => {
  const { data } = await axios.post(`${URL}/sessions`, {
    userId,
    session,
  });
  return data;
};
//Studied company 25+ sake products to increase customer selection experience and sales
export const deleteAllSessionsForSpot = async (
  userId: number,
  spotId: number
) => {
  const { data } = await axios.delete(`${URL}/allSessions`, {
    data: { userId, sessionId },
  });
  return data;
};

export const deleteSession = async (userId: number, sessionId: number) => {
  const { data } = await axios.delete(`${URL}/sessions`, {
    data: { userId, sessionId },
  });
  return data;
};
