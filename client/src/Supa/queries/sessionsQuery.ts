import { supabase } from "../connect.js";

//for creating a session it will also increment the count of the surfspot times surfed// when diary accept btn is clicked put both in a function
export const getAllSessions = async (userId) => {
  const { data, error } = await supabase
    .from("Sessions")
    .select()
    .eq("userId", userId);
  //.eq("userId", userId); // Fetch only spots associated with the current user

  if (error) {
    console.error("Error fetching all sessions:", error.message);
    return error;
  }

  return data;
};

export const createSession = async (session) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const user_id = userData.user.id;
  const { city, spot_name, rating, diary } = session;
  console.log("session", session);
  console.log("user_id", user_id);
  const response = await supabase
    .from("Sessions")
    .insert({ city, spot_name, rating, diary, user_id });
  console.log("response", response);
  return response;
};
