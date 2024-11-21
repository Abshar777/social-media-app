import { NextFunction, Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { AuthRequest } from "../types/api";
import Jwt from "../util/jwt";
import userSchema from "../model/userSchema";


const authMiddilware = AsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;

    if (!token) {
        console.log('no token')
        res.status(400);
        throw new Error("unothriezed user and user dont have token")
    } else {
        const jwt = new Jwt();
        const { payload: { userId } } = await jwt.verifyToken(token);
        const user = await userSchema.findById(userId);
        if (!user || user.isBlock) {
            console.log('user not found or user is Blocked');
            res.status(400);
            throw new Error("user not found or user is Blocked");
        }
        console.log('next');
        
        req.user = userId as string
        next();
    }
})

export default authMiddilware