import db from "../db/db.js";


export const getUsersModel = async () => {
  try {
    const [result] = await db.query("select * from users");
    return result;
  } catch (error) {
    throw new Error(`Error in getting users ${error.message}`);
  }
};

export const getUserByIdModel = async (userId) => {
  try {
    const [result] = await db.query("select * from users where user_id = ?", [userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in getting user by ID ${error.message}`);
  }
};

export const updateUserModel = async (userId,name,email,phone) => {
  try {
    const [result] = await db.query("UPDATE users SET name=?,email = ?,phone = ? WHERE user_id = ?", [name,email,phone,userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating user ${error.message}`);
  }
};

export const deleteUserModel = async (userId) => {

  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in deleting user ${error.message}`);
  }
};

export const updatePasswordModel = async(userId,hashPassword)=>{
  try {
    const [result] = await db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashPassword,userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating user password ${error.message}`);
  }
}

export const getUserByEmailModel = async(email)=>{
  try {
    const [result] = await db.query("select * from users where email=?",[email])
    return result
  } catch (error) {
    throw new Error(`Error in getting user by email ${error.message}`)
  }
}
