import supabase from "../config/supabase.js";

export const supabaseUsers = async () => {
  return supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });
};

export const supabaseUserById = async (id) => {
  return await supabase.from("users").select("*").eq("id", id).single();
};

export const supabaseUpdateUser = async (id, updateData) => {
  return await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();
};

export const findUserByField = async (column, value) => {
  return await supabase
    .from("users")
    .select("*")
    .eq(column, value)
    .maybeSingle();
};

export const supabaseInsertUser = async (insertValues) => {
  return await supabase.from("users").insert(insertValues).select().single();
};
