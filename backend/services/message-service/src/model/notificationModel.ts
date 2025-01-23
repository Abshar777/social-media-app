import mongoose, { Document, Schema } from "mongoose";
import INotification from "../types/interface/INotification";

export interface NotificationDocument extends INotification, Document {}

const notificationSchema = new Schema({
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ["FOLLOW_REQUEST", "LIKE", "COMMENT", "CALL", "FOLLOW_ACCEPT"],
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    },
    message: {
        type: String,
        required: function(this: NotificationDocument) {
            return this.type === "CALL";
        }
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ isRead: 1 });

export default mongoose.model<NotificationDocument>("Notification", notificationSchema);
