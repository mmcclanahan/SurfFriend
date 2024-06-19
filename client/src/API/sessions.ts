import axios from "axios";
import { URL } from "../config";
import { Session } from "../types/types";

export const getSessions = async (userId: number, monthNumber: number) => {
  const { data } = await axios.get(`${URL}/sessions/${userId}/${monthNumber}`);
  return data;
};

export const createSession = async (userId: number, session: Session) => {
  const { data } = await axios.post(`${URL}/sessions`, {
    userId,
    session,
  });
  return data;
};
