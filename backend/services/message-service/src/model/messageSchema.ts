import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/interface/IMessage";

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, trim: true },
        file: { type: String },
        type: { type: String, enum: ["Text", "Video", "Image", "Document", "Link", "Replay"], },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);
