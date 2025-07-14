import { response } from "../utils/common.js";
import {
  supabaseUserById,
  supabaseUsers,
  supabaseUpdateUser,
} from "../services/user.service.js";
import { uploadImage } from "../services/common.service.js";
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabaseUsers();
    if (error) return response(false, res, 401, error.message);

    return res.status(200).json({ data });
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabaseUserById(id);
    if (error) return response(false, res, 401, error.message);

    return response(true, res, 200, "User fetched successfully", data);
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req?.file;
    const { firstname, lastname } = req.body;
    let url;
    if (file) {
      url = await uploadImage(file, "user-bucket", id);
    }
    const { data, error } = await supabaseUpdateUser(id, {
      firstname,
      lastname,
      profile_url: file ? url.data : null,
    });

    if (error) return response(false, res, 401, error.message);
    return response(true, res, 200, "User updated successfully", data);
  } catch (error) {
    console.log("error :>> ", error);
    return response(false, res, 500, "Internal Server Error");
  }
};
