import express from "express"
import UserController from "../controller/userController";
import authMiddilware, { refreshTokenMidllWare } from "../middleware/authMiddileware";
const Router =express.Router();
const controller=new UserController()


// login user
Router.route("/login").post(controller.login.bind(controller));

// register user
Router.route("/register").post(controller.registerUser.bind(controller));

// check
Router.route("/check").get(authMiddilware,controller.checkUser.bind(controller));

// logout
Router.post("/logout",authMiddilware,controller.logoutUser.bind(controller));

// get refresh Token
Router.post("/token",controller.refreshTokenGet.bind(controller))


export default Router