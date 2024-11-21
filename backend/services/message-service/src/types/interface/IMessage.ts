import { Document, Types } from "mongoose";

export interface IMessage extends Document {
    sender: Types.ObjectId;
    text?: string;
    file?: string;
    type: "Text" | "Media" | "Document" | "Link" | "Replay";
    chatId: Types.ObjectId;
    readBy: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}