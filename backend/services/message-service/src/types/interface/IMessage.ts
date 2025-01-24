import { Document, Types } from "mongoose";

export interface IMessage extends Document {
    sender: Types.ObjectId;
    text?: string;
    file?: string;
    type: "Text" | "Media" | "Document" | "Link" | "Replay" | "Info";
    chatId: Types.ObjectId;
    seenBy: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedBy: Types.ObjectId[];
    isDeleted: boolean;
}