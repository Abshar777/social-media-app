import mongoose, { Document } from "mongoose";

export  interface IStories extends Document {
    userId: mongoose.Types.ObjectId;
    stories:IStory[]
}

export interface IStory extends Document{
    Url: string;
    caption?: string;
    createdAt: Date;
    expiresAt: Date;
    seenBy: mongoose.Types.ObjectId[];
}