import { response } from "../utils/common.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import supabase from "../config/supabase.js";
export const authenticateUser = async (req, res, next) => {
  console.log("req.headers.authorization :>> ", req.headers.authorization);
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return response(false, res, 401, "Authorization token is missing");
  }
  try {

    const decodedToken = await supabase.auth.getUser(token);
    console.log("decodedToken :>> ", decodedToken);
    if (!decodedToken.data.user) {
      return response(false, res, 401, "Invalid or expired token");
    }
    req.user = decodedToken.user;

    // const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    // req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return response(false, res, 500, "Internal Server Error");
  }
};
