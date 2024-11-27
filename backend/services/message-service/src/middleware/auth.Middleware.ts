import { NextFunction, Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { AuthRequest } from "../types/api";
import Jwt from "../util/jwt";
import userSchema from "../model/userSchema";


const authMiddilware = AsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const {authorization:authHeader} = req.headers;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Access token required");
    }
    const jwt = new Jwt();
    const { payload } = await jwt.verifyToken(token);
    if (!payload.userId) {
        res.status(400);
        throw new Error("user not found");
    }
    const user = await userSchema.findById(payload.userId);
    if (!user || user.isBlock) {
        console.log('user not found or user is Blocked');
        res.status(400);
        throw new Error("user not found or user is Blocked");
    }
    req.user = payload.userId as string;
    next();


});

export default authMiddilware