import { supabase } from "../connect.js";
import { Session } from "../../types/types.js";

export const getAllSessions = async (userId: string) => {
  const response = await supabase
    .from("Sessions")
    .select()
    .eq("user_id", userId);

  return response;
};
// get all friends sessions, need to see who the friends are
export const getFriendsSessions = async (userId: string) => {
  const response = await supabase.rpc("get_friends_sessions", {
    p_user_id: `${userId}`,
  });
  return response;
};
export const createSession = async (session: Session, user_id: string) => {
  const { city, spot_name, rating, diary } = session;
  const response = await supabase
    .from("Sessions")
    .insert({ city, spot_name, rating, diary, user_id });

  return response;
};

//export const getFriendsSessions = async (userId: string) => {
