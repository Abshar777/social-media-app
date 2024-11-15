import { Types } from "mongoose";

export interface IChat extends Document {
  members: Types.ObjectId[];
  chatName?: string;
  isGroupChat: boolean;
  latestMessage?: Types.ObjectId;
  groupAdmins?: Types.ObjectId[];
  groupImage?: string;
  latestMessageCount?: number;
  latestMessageTime:string;
}