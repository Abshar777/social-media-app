import { Request } from "express";
import { ObjectId } from "mongoose";

export interface AuthRequest extends Request{
    user?:  string;
}

