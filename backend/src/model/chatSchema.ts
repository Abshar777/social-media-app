import mongoose, { Schema, Document, Types } from 'mongoose';
import { IChat } from '../types/chatTypes';



const ChatSchema: Schema = new Schema(
    {
      members: [
        { type: Schema.Types.ObjectId, ref: 'User', required: true }
      ],
      chatName: {
        type: String,
        trim: true
      },
      isGroupChat: {
        type: Boolean,
        default: false
      },
      latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      },
      latestMessageCount:{
        type:Number,
        default:0,
      },
      groupAdmins: [
        { type: Schema.Types.ObjectId, ref: 'User' }
      ],
      groupImage: {
        type: String
      }
    },
    {
      timestamps: true
    }
  );

const Chat = mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
