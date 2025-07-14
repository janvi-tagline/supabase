import supabase from "../config/supabase.js";

export const createSupabaseAuthUser = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const signInSupabaseAuthUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};
