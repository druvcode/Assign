import db from "../db/db.js";

export const signupModel = async (name, email, hashPassword, phone) => {
  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashPassword, phone]
    );
    return result;
  } catch (error) {
    throw new Error(`Error in Signup ${error.message}`);
  }
};


export const userExistModel=async(email)=>{
  try {
      const [result] =await db.query("select * from users where email=?",[email])
      return result
  } catch (error) {
      throw new Error(`Error in getting user by email ${error.message}`)
  }
}

