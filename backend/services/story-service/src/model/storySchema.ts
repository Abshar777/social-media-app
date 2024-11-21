import mongoose, { Schema } from 'mongoose';
import { IStories, IStory } from '../types/interface/IStory';


const StorySchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stories: [{
        url: {
            type: String,
            required: true,
        },
        caption: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            default: () => new Date(+new Date() + 24 * 60 * 60 * 1000)
        },
        seenBy: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
            unique:true
        }]
    }]
});

export default mongoose.model<IStories>('Story', StorySchema);
