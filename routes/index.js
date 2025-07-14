import express from "express";
const router = express.Router();

import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import booksRouter from "./books.route.js";

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/books", booksRouter);

export default router;
