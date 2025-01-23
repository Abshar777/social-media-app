import { Document, Types } from "mongoose";

export interface INotification extends Document {
    recipient: Types.ObjectId;
    sender: Types.ObjectId;
    type: "FOLLOW_REQUEST" | "LIKE" | "COMMENT" | "CALL" | "FOLLOW_ACCEPT";
    post?: Types.ObjectId;
    comment?: Types.ObjectId;
    message?: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default INotification; 
