import jwt from "jsonwebtoken"
import { getUserByIdModel } from "../../models/users.model.js";



export const check=async(req,res)=>{
    try {
        const token=req.cookies.accessToken;
        if(!token){
          return res.status(400).json({message:"LogIn first"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId=decoded.id
        const user = await getUserByIdModel(userId)

        if(!user){
           return res.status(400).json({message:"User not exist"})
        }
        return res.status(200).json({
            user: {
                id: user[0].user_id,
                email: user[0].email,
                name:user[0].name,
              }
    })
      } catch (error) {
        res.status(500).json({message:error.message})
      }
}