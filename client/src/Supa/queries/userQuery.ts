import { supabase } from "../connect";

export const getUser = async () => {
  const response = await supabase.auth.getUser();
  return response;
};

export const createUser = async (email: string, password: string) => {
  const response = await supabase.auth.signUp({ email, password });
  return response;
};

export const signIn = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
};

export const signOut = async () => {
  const response = await supabase.auth.signOut();
  return response;
};
