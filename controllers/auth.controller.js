import {
  createSupabaseAuthUser,
  signInSupabaseAuthUser,
} from "../services/auth.service.js";
import { response } from "../utils/common.js";
import {
  findUserByField,
  supabaseInsertUser,
  supabaseUpdateUser,
} from "../services/user.service.js";
export const signUp = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const { data: existingUser, error: findError } = await findUserByField(
      "email",
      email
    );
    if (findError) return response(false, res, 500, findError.message);
    if (existingUser)
      return response(false, res, 400, "User with this email already exists.");

    const { data: authData, error: signUpError } = await createSupabaseAuthUser(
      email,
      password
    );
    if (signUpError) return response(false, res, 400, signUpError.message);

    const userId = authData?.user?.id;
    if (!userId) {
      return response(false, res, 500, "Signed up but no user ID returned.");
    }

    const { data: insertedUser, error: insertError } = await supabaseInsertUser(
      {
        id: userId,
        email,
        firstname,
        lastname,
      }
    );

    if (insertError) return response(false, res, 500, insertError.message);

    return response(true, res, 201, "User created successfully", insertedUser);
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: authData, error: signInError } = await signInSupabaseAuthUser(
      email,
      password
    );
    if (signInError) return response(false, res, 401, signInError.message);

    const userId = authData.user?.id;
    if (!userId)
      return response(false, res, 500, "User ID missing after login.");

    const { data: user, error: updateError } = await supabaseUpdateUser(
      userId,
      { last_logged_in: new Date() }
    );
    if (updateError) return response(false, res, 500, updateError.message);

    return response(true, res, 200, "User logged in successfully", {
      user,
      accessToken: authData.session.access_token,
    });
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
