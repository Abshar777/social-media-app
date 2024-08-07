import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import AsyncHandler from "express-async-handler";
import userModel from "../model/userSchema";
import jwtPayload from "../types/jwt";
import { AuthRequest } from "../types/api";
import userType from "../types/userType";

const authMiddilware=AsyncHandler(async(req:AuthRequest,res:Response,next:NextFunction)=>{
    console.log('hello')
   
    const token=req.cookies.jwt || req.body?.jwt;
    if(!token){
        console.log('no token')
        res.status(400);
        throw new Error("unothriezed user and user dont have token")
    }else{
        req.cookies.
        console.log(' token')
        const secret=process.env.JWT_SECRET || ""
        const decode =await jwt.verify(token,secret) as jwtPayload
        const userId=decode?.userId|| " "
        
        req.user=await userModel.findById(userId).select('-password') as userType
        next();
    }
})

export default authMiddilware