import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
  firstname: Joi.string().min(2).optional(),
  lastname: Joi.string().min(2).optional(),
  role: Joi.string().valid("user", "admin").optional().default("user"),
});
