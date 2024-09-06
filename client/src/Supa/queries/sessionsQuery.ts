import { supabase } from "../connect.js";
import { Session } from "../../types/types.js";

export const getAllSessions = async (userId: string) => {
  const response = await supabase
    .from("Sessions")
    .select()
    .eq("user_id", userId);

  return response;
};

export const createSession = async (session: Session, user_id: string) => {
  const { city, spot_name, rating, diary } = session;
  const response = await supabase
    .from("Sessions")
    .insert({ city, spot_name, rating, diary, user_id });

  return response;
};
