import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/interface/IMessage";

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, trim: true },
        file: { type: String },
        type: { type: String, enum: ["Text", "Media", "Document", "Link","Replay"], },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);
