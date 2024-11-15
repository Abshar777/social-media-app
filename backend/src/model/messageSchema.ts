import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/messageTypes";

const MessageSchema: Schema = new Schema(
    {
      chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true
      },
      type: {
        type: String,
        enum: ["message", "audio", "img", "video", "doc"],
        default: "message"
      },
      isForward: {
        type: Boolean,
        default: false
      },
      isReplay: {
        type: Boolean,
        default: false
      },
      isRead: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );
  
 
  const Message = mongoose.model<IMessage>('Message', MessageSchema);
  
  export default Message