import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from '../types/interface/IComment';



const CommentSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    unLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    replay: [{
      userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
      unLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;
