import mongoose from "mongoose";

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    description: string;
    content: string;
    category:"video" | "photo" | "sizzle"
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    isArchive:boolean;
    isDelete:boolean;

}