import mongoose, { Document } from "mongoose";

interface IUser extends Document  {
    name: string;
    email:string;
    password:string;
    img?:string;
    isBlock?:boolean;
    isVerify?:boolean;
    isAdmin?:boolean;
    bio?: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    stories:mongoose.Types.ObjectId[];
    socket_id:string;
    postCount:number;
    archiveChat:mongoose.Types.ObjectId[];
    starredMessage:mongoose.Types.ObjectId[];
    status:string;
    isOnline:boolean;
    latestOnline:Date;
    pinnedChat:mongoose.Types.ObjectId[];
}

export default IUser