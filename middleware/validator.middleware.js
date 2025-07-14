import { response } from "../utils/common.js";

export const validatorMiddleware = (validationSchema) => {
  return async (req, res, next) => {
    try {
      const incomingValues = { ...req?.body, ...req?.query, ...req?.params };
      if (req?.file) incomingValues.file = req.file;
      if (req?.files) incomingValues.files = req.files;
      await validationSchema.validateAsync(incomingValues, {
        // abortEarly: false,
        // allowUnknown: true,
        // stripUnknown: true,
      });
      next();
    } catch (error) {
      console.error("Validation error:", error);
      return response(false, res, 422, error.message);
    }
  };
};
