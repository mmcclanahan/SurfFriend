import axios from "axios";

export const getFriends = async (userId: number) => {
  const response = await axios.get(`http://localhost:8080/friends/${userId}`);
  return response;
};

export const createFriendRequest = async (
  userId: number,
  friendUserName: string
) => {
  const { data } = await axios.post("/friends", { userId, friendUserName });
  return data;
};
