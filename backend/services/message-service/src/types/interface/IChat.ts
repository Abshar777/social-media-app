import { Document, Types } from "mongoose";

export interface IChat extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[];
    latestMessage?: Types.ObjectId;
    latestMessageCount:number;
    groupAdmin?: Types.ObjectId[];
    createdAt: Date;
    lastSender:Types.ObjectId;
    updatedAt: Date;
    createdUser:Types.ObjectId;
}