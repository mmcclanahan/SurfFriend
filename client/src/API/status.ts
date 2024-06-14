import axios from "axios";

export const getStatus = async (userId: number) => {
  const { data } = await axios.get(`/status/${userId}`);
  return data;
};

export const updateStatus = async (
  userId: number,
  status: number,
  location?: string,
  rating?: number
) => {
  const { data } = await axios.put("/status", {
    userId,
    status,
    location,
    rating,
  });
  return data;
};
