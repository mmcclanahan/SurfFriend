import axios from "axios";
import { URL } from "../config";

export const getFriends = async (userId: number) => {
  const { data } = await axios.get(`${URL}/friends/${userId}`);
  return data;
};

export const createFriendRequest = async (
  userId: number,
  friendUserName: string
) => {
  const { data } = await axios.post(`${URL}/friends`, {
    userId,
    friendUserName,
  });
  return data;
};

export const confirmFriendRequest = async (
  userId: number,
  friendId: number
) => {
  const { data } = await axios.put(`${URL}/friends`, {
    userId,
    friendId,
  });
  return data;
};

export const deleteFriend = async (userId: number, friendId: number) => {
  const { data } = await axios.delete(`${URL}/friends`, {
    data: { userId, friendId },
  });
  return data;
};
