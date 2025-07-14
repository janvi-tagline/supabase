import supabase from "../config/supabase.js";

export const createBooks = async (book) => {
  return await supabase.from("books").insert(book);
};

export const getBooksFromSupabase = async (search) => {
  if (!search) {
    return await supabase.from("books").select("*");
  }

  //below query is use ilike search , which is case-insensitive search and exact match of substring
  // return await supabase.from("books").select("*").ilike("title", `%${search}%`);

  // return await supabase
  //   .from("books")
  //   .select("*")
  //   .textSearch("title", `${search}`);
  
  return supabase.rpc("search_books_by_title", { search_text: search });
};

export const requestBookFromSupabase = async ({ bookId, userId }) => {
  return await supabase
    .from("book_requests")
    .insert({ book_id: bookId, user_id: userId });
};

export const getBookRequestsFromSupabase = async (status) => {
  const query = supabase.from("book_requests").select("*,users(*),books(*)");
  if (status) {
    query.eq("status", status);
  }

  return await query;
};
