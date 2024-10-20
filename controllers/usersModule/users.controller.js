import { getUserByIdModel, getUsersModel, updateUserModel, deleteUserModel } from "../../models/users.model.js";
const saltRound=process.env.SALT_ROUND||10;


export const getUsers = async(req,res)=>{
    try{
        const result=await getUsersModel()
        result.forEach(user=>delete user.password)
        return res.status(200).json({message:"Users fetched successfully",data:result})
    }catch(err){
        
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getUserById = async(req,res)=>{
    const userId=req.params.id
    try{
        const result=await getUserByIdModel(userId)
        delete result[0].password
        return res.status(200).json({message:"User fetched successfully",data:result})
    }catch(err){
        console.log(err)

        return res.status(500).json({message:"Something went wrong"})
    }
}

export const updateUser = async(req,res)=>{
    const userId=req.params.id
    const {name,email,phone}=req.body

    if (!name|| !email|| !phone) {
        return res.status(400).json({ message: "All fields required" });
      }
    try {
        
        const result = await getUserByIdModel(userId);
        const user = result[0];
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        await updateUserModel(userId,name,email,phone);

        return res.status(200).json({ message: "User updated successfully" });
        }
     catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async(req,res)=>{
    const userId=req.params.id
if(!userId){
        return res.status(400).json({message:"User id is required"})
    }
    try{
        const result=await deleteUserModel(userId)
        return res.status(200).json({message:"User deleted successfully"})
    }catch(err){
        
        return res.status(500).json({message:"Something went wrong"})
    }
}
