import Joi from "joi";

export const createBookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    quantity: Joi.number().integer().required(),
    available:Joi.number().integer().required(),
    author: Joi.string().min(3).max(50).required(),
})

