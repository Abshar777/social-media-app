import { Types } from "mongoose";

export interface IMessage extends Document {
    chat: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    type:"message"|"audio" |"img"|"video"|"doc" |"poll";
    isForward:boolean;
    isReplay:boolean;
    isRead: boolean;
}