import express from "express"
import messageController from "../controller/messageController";
const Router =express.Router();
const controller=new messageController();


export default Router