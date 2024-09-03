import { supabase } from "../connect.js";
import { Session } from "../../types/types.js";

//for creating a session it will also increment the count of the surfspot times surfed// when diary accept btn is clicked put both in a function
export const getAllSessions = async (userId) => {
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
