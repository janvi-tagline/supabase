import { response } from "../utils/common.js";
import {
  createBooks,
  getBookRequestsFromSupabase,
  getBooksFromSupabase,
  requestBookFromSupabase,
} from "../services/book.service.js";

export const addBook = async (req, res) => {
  try {
    const { title, quantity, author } = req.body;
    console.log(
      "title, quantity, available, author  :>> ",
      title,
      quantity,
      author
    );
    const { data, error } = await createBooks({
      title,
      quantity,
      available: quantity,
      author,
    });
    console.log("error :>> ", error);
    if (error) return response(false, res, 500, error.message);
    return response(true, res, 201, "Book created successfully", data);
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};

export const getBooks = async (req, res) => {
  try {
    const { search } = req.query;

    const { data, error } = await getBooksFromSupabase(search);
    if (error) return response(false, res, 500, error.message);
    return response(true, res, 200, "Books fetched successfully", data);
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};

export const requestBook = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const { data, error } = await requestBookFromSupabase({
      bookId,
      userId,
    });
    if (error) return response(false, res, 500, error.message);
    return response(true, res, 200, "Book requested successfully");
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};

export const getBookRequests = async (req, res) => {
  try {
    const { data, error } = await getBookRequestsFromSupabase();
    if (error) return response(false, res, 500, error.message);
    return response(true, res, 200, "Book requests fetched successfully", data);
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};
