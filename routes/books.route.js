import express from "express";
const booksRouter = express.Router();
import {
  addBook,
  getBooks,
  requestBook,
  getBookRequests,
} from "../controllers/books.controller.js";

booksRouter.post("/add", addBook);
booksRouter.get("/", getBooks);
booksRouter.post("/request/:bookId/:userId", requestBook);
booksRouter.get("/requests", getBookRequests);

export default booksRouter;
