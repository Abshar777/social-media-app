import { NextFunction, Response } from "express";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model, ObjectId, Types } from "mongoose";
import { AuthRequest } from "../types/api";
import { IChat } from "../types/interface/IChat";
import chatSchema from "../model/chatSchema";
import { IMessage } from "../types/interface/IMessage";
import messageSchema from "../model/messageSchema";
import IUser from "../types/interface/IUser";


class ChatController {
    private UserModel: Model<UserDocument>;
    private ChatModel: Model<IChat>;
    private messageModel: Model<IMessage>

    constructor() {
        this.UserModel = userSchema;
        this.ChatModel = chatSchema;
        this.messageModel = messageSchema;
    }

    //@body    id:userId
    //@method  POST
    //@desc    when user search get email if exist the chat it will fetch the chat or other wisse other wise create chat 
    async accessChatOrCreateChat(req: AuthRequest, res: Response, next: NextFunction) {
        const { id } = req.body;
        const user = await this.UserModel.findById(id);
        if (!user) return res.status(400).json({ message: "id is not valid" });
        const chat = await this.ChatModel.findOne({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user } } },
                { users: { $elemMatch: { $eq: id } } },
            ],
        }).populate("users", "name img _id")
        if (chat) return res.status(200).json({ message: "succefully get availble chat", data: chat })
        const newChat = await (await this.ChatModel.create({ chatName: "UNTITLED", users: [req.user, id] })).populate("users", "-password") as IChat & { users: IUser[] };
        const msg = await this.messageModel.create({ chatId: newChat._id, type: "Info", sender: req.user, text: `${newChat.users[0]?.name} created this chat` })
        newChat.latestMessage = msg._id as Types.ObjectId;
        newChat.latestMessageCount = 1;
        const data = await (await newChat.save()).populate("latestMessage")
        res.status(201).json({ message: "succefully create chat", data });
    }

    // @desc    fetch all chat 
    // @method  GET
    async fetchAllChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const chats = await this.ChatModel.find({ users: { $elemMatch: { $eq: req.user } } }).populate("users", "-password").populate("latestMessage").populate("lastSender", "name").sort({ updatedAt: -1 });
            res.status(200).json({ message: "succefully fetch all chats", data: chats })
        } catch (error) {
            next(error)
        }
    }


    // @desc    create group chat
    // @method  POST
    // @body    users,name:groupName
    async createGroupChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { users = [], name } = req.body;
            if (!name) return res.status(400).json({ message: "name not found" });
            users.push(req.user);
            const chat = await (await (await this.ChatModel.create({ chatName: name, users })).populate("users", "-password")).populate("latestMessage")
            res.status(200).json({ message: "succefully create group chat", data: chat })
        } catch (error) {
            next(error);
        }
    }


    // @desc   rename group chat
    // @method  PUT
    // @body    name,id:groupId
    async renameGroup(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { name, id } = req.body;
            if (!name) return res.status(400).json({ message: "name not found" });
            const chat = await this.ChatModel.findOneAndUpdate({ _id: id }, { chatName: name, }).populate("users", "-password").populate("latestMessage")
            res.status(200).json({ message: "succefully create group chat", data: chat })
        } catch (error) {
            next(error);
        }
    }


    // @desc    Add user to group chat
    // @method  PUT
    // @body    userId, id:chatid
    async addUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { userId, id } = req.body;
            const chat = await this.ChatModel.findById(id);

            if (!chat) return res.status(404).json({ message: "Chat not found" });
            if (chat.isGroupChat === false) return res.status(400).json({ message: "Not a group chat" });
            if (chat.users.includes(userId)) {
                return res.status(400).json({ message: "User already in the group" });
            }

            chat.users.push(userId);
            await chat.save();
            const updatedChat = await (await chat.populate("users", "-password")).populate("latestMessage")

            res.status(200).json({ message: "User added to group", data: updatedChat });
        } catch (error) {
            next(error);
        }
    }


    // @desc    Remove user from group chat
    // @method  PUT
    // @body    userId, id:chatId
    async removeUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { userId, id } = req.body;
            const chat = await this.ChatModel.findById(id);

            if (!chat) return res.status(404).json({ message: "Chat not found" });
            if (chat.isGroupChat === false) return res.status(400).json({ message: "Not a group chat" });

            chat.users = chat.users.filter((user) => user.toString() !== userId);
            await chat.save();
            const updatedChat = await (await chat.populate("users", "-password")).populate("latestMessage")

            res.status(200).json({ message: "User removed from group", data: updatedChat });
        } catch (error) {
            next(error);
        }
    }


    // @desc    Delete group chat and its messages
    // @method  DELETE
    // @body    id:chatId
    async deleteGroup(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const chat = await this.ChatModel.findById(id);

            if (!chat) return res.status(404).json({ message: "Chat not found" });
            if (chat.isGroupChat === false) return res.status(400).json({ message: "Not a group chat" });

            // Delete all messages associated with the chat
            await this.messageModel.deleteMany({ id });
            await this.ChatModel.findByIdAndDelete(id)

            res.status(200).json({ message: "Group chat and messages deleted" });
        } catch (error) {
            next(error);
        }
    }


    // @desc    upload group avatar
    // @method  POST
    // @body    id:chatId,avatar:image
    async uploadGroupAvatar(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, avatar } = req.body;
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "Chat not found" });
            if (chat.isGroupChat === false) return res.status(400).json({ message: "Not a group chat" });
            chat.groupAvatar = avatar;
            await chat.save();
            res.status(200).json({ message: "Group avatar uploaded", data: chat });
        } catch (error) {
            next(error);
        }
    }

    // @desc    delete group avatar
    // @method  DELETE
    // @body    id:chatId
    async deleteGroupAvatar(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "Chat not found" });
            if (chat.isGroupChat === false) return res.status(400).json({ message: "Not a group chat" });
            chat.groupAvatar = "";
            await chat.save();
            res.status(200).json({ message: "Group avatar deleted", data: chat });
        } catch (error) {
            next(error);
        }
    }


    // @desc serach chat by name or email or user name 
    // @method  GET
    // @body    name:chatName
    async searchChatByName(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;
            if (!name) return res.status(400).json({ message: "name not found" });
            const chats = await this.ChatModel.find({
                $or: [{ chatName: { $regex: name, $options: 'i' } }, { users: { $elemMatch: { $eq: name } } }]
            }).populate("users", "-password").populate("latestMessage")
            res.status(200).json({ message: "succefully search chat", data: chats })
        } catch (error) {
            next(error);
        }
    }



}

export default ChatController;
