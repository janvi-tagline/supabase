import Joi from "joi";

export const singleUserSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  firstname: Joi.string().min(2).max(30).optional(),
  lastname: Joi.string().min(2).max(30).optional(),
  file: Joi.object({
    fieldname: Joi.string(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpeg", "application/pdf")
      .error(Error("File must be an image (PNG, JPEG) or PDF")),
    size: Joi.number()
      .max(10000000)
      .error(Error("Image size must be less than 10MB")),
  })
    ?.unknown()
    ?.required(),
});
