import express from "express";
const booksRouter = express.Router();
import {
  addBook,
  getBooks,
  requestBook,
  getBookRequests,
} from "../controllers/books.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

booksRouter.post("/add",authenticateUser, addBook);
booksRouter.get("/", getBooks);
booksRouter.post("/request/:bookId/:userId", authenticateUser, requestBook);
booksRouter.get("/requests",authenticateUser, getBookRequests);

export default booksRouter;
