import express from "express"
import chatController from "../controller/chatController";
const Router =express.Router();
const controller=new chatController();


export default Router