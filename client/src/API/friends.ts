import axios from "axios";

export const getFriends = async (userId: number) => {
  const { data } = await axios.get(`http://localhost:8080/friends/${userId}`);
  return data;
};

export const createFriendRequest = async (
  userId: number,
  friendUserName: string
) => {
  const { data } = await axios.post("http://localhost:8080/friends", {
    userId,
    friendUserName,
  });
  return data;
};

export const confirmFriendRequest = async (
  userId: number,
  friendId: number
) => {
  const { data } = await axios.put("http://localhost:8080/friends", {
    userId,
    friendId,
  });
  return data;
};

export const deleteFriend = async (userId: number, friendId: number) => {
  const { data } = await axios.delete("http://localhost:8080/friends", {
    data: { userId, friendId },
  });
  return data;
};
