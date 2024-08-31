import { supabase } from "../Supa/supa";

export const getUser = async () => {
  const response = await supabase.auth.getUser();
  return response;
};
//when used also call the create status function with the response uuid
export const createUser = async (email, password) => {
  const response = await supabase.auth.signUp({ email, password });
  return response;
};

export const signIn = async (email, password) => {
  const response = await supabase.auth.signIn({ email, password });
  return response;
};
