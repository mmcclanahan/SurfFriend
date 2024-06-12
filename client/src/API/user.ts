import axios from "axios";

export const getUser = async (userId: number) => {
  const { data } = await axios.get(`/user/${userId}`);
  return data;
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  salt?: string,
  sessiontoken?: string
) => {
  const { data } = await axios.post("/user", {
    username,
    email,
    password,
    salt,
    sessiontoken,
  });
  return data;
};
