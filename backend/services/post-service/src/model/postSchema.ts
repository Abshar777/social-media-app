import mongoose, { Document, Schema } from 'mongoose';
import { IPost } from '../types/interface/IPost';



const PostSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, enum: ["video", "post", "sizzle"], required: true },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
        isArchive:{type:Boolean,default:false},
        isDelete:{type:Boolean,default:false},

    },
    { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);


