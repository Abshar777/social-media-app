import mongoose from "mongoose";

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  likes: mongoose.Types.ObjectId[];
  unLikes:mongoose.Types.ObjectId[];
  replay: IReplay[];
}

export interface IReplay extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  unLikes:mongoose.Types.ObjectId[];
  createdAt: Date;
}
