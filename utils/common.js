

export const response = (flag, res, statusCode, message, data) => {
  if (flag) {
    return res.status(statusCode).json({ message, data });
  }
  return res.status(statusCode).json({ message });
};

