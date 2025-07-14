import express from "express";
const userRouter = express.Router();
import {
  getUserInfo,
  getUsers,
  updateUserInfo,
} from "../controllers/user.controller.js";
import { validatorMiddleware } from "../middleware/validator.middleware.js";
import {
  singleUserSchema,
  updateUserSchema,
} from "../validators/userValidator.js";
import multer from "multer";
const upload = multer();
import { authenticateUser } from "../middleware/auth.middleware.js";

userRouter.get("/", getUsers);

userRouter.get(
  "/:id",
  validatorMiddleware(singleUserSchema),
  authenticateUser,
  getUserInfo
);

userRouter.patch(
  "/:id",
  upload.single("profilePic"),
  validatorMiddleware(updateUserSchema),
  authenticateUser,
  updateUserInfo
);

export default userRouter;
