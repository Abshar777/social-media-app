import { Request } from "express";
import userType from "./userType";

export interface AuthRequest extends Request{
    user?:user;
}

interface user extends userType{
    _id?:string
}