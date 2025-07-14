import express from "express";
const authRouter = express.Router();
import { signUp, signIn } from "../controllers/auth.controller.js";
import { validatorMiddleware } from "../middleware/validator.middleware.js";
import { signUpSchema, signInSchema } from "../validators/authValidator.js";

authRouter.post("/signup", validatorMiddleware(signUpSchema), signUp);
authRouter.post("/signin", validatorMiddleware(signInSchema), signIn);

export default authRouter;
