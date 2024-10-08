import { supabase } from "../connect.js";
import { StatusForm } from "../../types/types.js";

export const getStatus = async () => {
  //get user
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const userId = data.user.id;
  const response = await supabase
    .from("UserStatus")
    .select()
    .eq("user_id", userId);
  return response;
};

export const updateStatus = async (statusForm: StatusForm) => {
  const { status, city, spot_name, rating } = statusForm;
  const response = await supabase
    .from("UserStatus")
    .update({ status, city, spot_name, rating })
    .eq("id", statusForm.statusId);
  return response;
};

export const createStatus = async (id: string, displayName: string) => {
  const response = await supabase
    .from("UserStatus")
    .insert({ user_id: id, status: 1, display_name: displayName, rating: 3 });
  return response;
};
