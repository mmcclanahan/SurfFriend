import axios from "axios";

export const getStatus = async (userId: number) => {
  const { data } = await axios.get(`/status/${userId}`);
  return data;
};

export const updateStatus = async (userId: number, status: string) => {
  const { data } = await axios.post("/status", { userId, status });
  return data;
};
