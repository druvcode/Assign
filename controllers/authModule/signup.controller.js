import { signupModel, userExistModel } from "../../models/auth.model.js";
import bcrypt from "bcrypt";
const saltRound = process.env.SALT_ROUND || 10;

export const signUp = async (req, res) => {
  const { name, email, password,phone} = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  
  try {
    const userExist = await userExistModel(email);
    if (userExist.length === 0) {
      // Hashing password
      const hashPassword = await bcrypt.hash(password, parseInt(saltRound));

      // Inserting user
    const result=  await signupModel(name, email, hashPassword,phone);

      return res.status(200).json({ message: "User registered" });
    } else {
      return res.status(400).json({ message: "User already registered. Try to log in." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
