import express from "express";
import {  getUsers, getUserById, updateUser,deleteUser } from "../controllers/usersModule/users.controller.js";
import { changePassword } from "../controllers/usersModule/changePassword.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/getUsers",getUsers);
router.get("/getUserById/:id",authenticate,getUserById);
router.put("/updateUser/:id", authenticate, updateUser);
router.delete("/deleteUser/:id",authenticate,deleteUser);
router.post("/changePassword/:id", authenticate,changePassword);

export default router;  
