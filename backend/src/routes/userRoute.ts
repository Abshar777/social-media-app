import express, { Request, Response } from "express";
import { checkUser, getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controller/userController"
import authMiddilware from "../middleware/authMiddileware";
const Router=express.Router()

// login user
Router.route("/login").post(loginUser);

// register user
Router.route("/register").post(registerUser);

// get user profile and update user profile
Router.route("/profile").get(authMiddilware,getUserProfile).put(authMiddilware,updateUserProfile)

// check user is valid or note
Router.get("/check",checkUser)

// logout user
Router.route('/logout').post(logoutUser)


export default Router