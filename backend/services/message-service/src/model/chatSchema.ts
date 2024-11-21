import mangoose,{  Schema } from "mongoose";
import { IChat } from "../types/interface/IChat";

const chatSchema = new Schema<IChat>({
    chatName: { type: String, required: true },
    isGroupChat: { type: Boolean, required: true, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    lastSender:{type: Schema.Types.ObjectId, ref: "User"},
    latestMessageCount:{type:Number,default:0},
    groupAdmin: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdUser:{ type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
}
)

export default mangoose.model<IChat>("Chat",chatSchema)