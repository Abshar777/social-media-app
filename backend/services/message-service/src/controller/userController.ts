import { NextFunction, Response } from "express";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model } from "mongoose";
import { AuthRequest } from "../types/api";
import messageSchema from "../model/messageSchema";
import { IMessage } from "../types/interface/IMessage";
import { IChat } from "../types/interface/IChat";
import chatSchema from "../model/chatSchema";


class UserController {
    private UserModel: Model<UserDocument>;
    private MessageModel: Model<IMessage>;
    private ChatModel: Model<IChat>;

    constructor() {
        this.UserModel = userSchema;
        this.MessageModel = messageSchema;
        this.ChatModel = chatSchema;

    }

    //@body    id:chatId    
    //@method  POST
    //@desc    archive the chat
    async archiveChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "chatId is required" });
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "chat not found" });
            await this.UserModel.findByIdAndUpdate(req.user, { $push: { archiveChat: id } });
            res.status(200).json({ message: "succefully archived the chat" });
        } catch (error) {
            next(error);
        }
    }

    //@desc    get all archive chat
    //@method  GET
    async getAllArchiveChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const chats = await this.UserModel.findById(req.user).select('archiveChat');
            res.status(200).json({ message: "successfully fetched all archive chat", data: chats });
        } catch (error) {
            next(error);
        }
    }

    //@desc    unarchive the chat
    //@method  PUT
    //@body    id:chatId
    async unarchiveChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "chatId is required" });
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "chat not found" });
            await this.UserModel.findByIdAndUpdate(req.user, { $pull: { archiveChat: id } });
            res.status(200).json({ message: "succefully unarchived the chat" });
        } catch (error) {
            next(error);
        }
    }

    //@desc    get all starred message
    //@method  GET
    async getAllStarredMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const messages = await this.UserModel.findById(req.user).select('starredMessage');
            res.status(200).json({ message: "successfully fetched all starred message", data: messages });
        } catch (error) {
            next(error);
        }
    }

    //@body    id:userId
    //@method  PUT
    //@desc    star the message
    async starMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "messageId is required" });
            const message = await this.MessageModel.findById(id);
            if (!message) return res.status(404).json({ message: "message not found" });
            await this.UserModel.findByIdAndUpdate(req.user, { $push: { starredMessage: id } });
            res.status(200).json({ message: "succefully starred the message" });
        } catch (error) {
            next(error);
        }
    }


    //@body    id:messageId
    //@method  PUT
    //@desc    unstar the message
    async unstarMessage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "messageId is required" });
            await this.UserModel.findByIdAndUpdate(req.user, { $pull: { starredMessage: id } });
            res.status(200).json({ message: "succefully unstarred the message" });
        } catch (error) {
            next(error);
        }
    }

    //@body    isOnline:isOnline
    //@method  PUT
    //@desc    Update user isOnline and latestOnline
    async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { isOnline } = req.body;
            const data: Record<string, any> = { isOnline };
            if (isOnline) data.latestOnline = Date.now();
            const updatedUser = await this.UserModel.findByIdAndUpdate(
                req.user,
                { $set: data },
                { new: true }
            ).select('-password');
            res.status(200).json({ message: "successfully updated status", data: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    //@body    id:chatId
    //@method  PUT
    //@desc    pin the chat
    async pinChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "chatId is required" });
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "chat not found" });
            await this.UserModel.findByIdAndUpdate(req.user, { $push: { pinnedChat: id } });
            res.status(200).json({ message: "succefully pinned the chat" });
        } catch (error) {
            next(error);
        }
    }

    //@body    id:chatId
    //@method  PUT
    //@desc    unpin the chat
    async unpinChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "chatId is required" });
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "chat not found" });
            await this.UserModel.findByIdAndUpdate(req.user, { $pull: { pinnedChat: id } });
            res.status(200).json({ message: "succefully unpinned the chat" });
        } catch (error) {
            next(error);
        }
    }

    //@body    id:chatId
    //@method  DELETE
    //@desc    delete the chat
    async deleteChat(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).json({ message: "chatId is required" });
            const chat = await this.ChatModel.findById(id);
            if (!chat) return res.status(404).json({ message: "chat not found" });
            await this.ChatModel.findByIdAndDelete(id);
            res.status(200).json({ message: "succefully deleted the chat" });
        } catch (error) {
            next(error);
        }
    }

    //@desc   search user by name or email or user name
    //@method  GET
    //@body    name:string
    async searchUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;
            if (!name) return res.status(400).json({ message: "name is required" });
            const users = await this.UserModel.find({ $or: [{ name }, { email: { $regex: name, $options: 'i' } }, { name: { $regex: name, $options: 'i' } }] });
            res.status(200).json({ message: "successfully fetched all users", data: users });
        } catch (error) {
            next(error);
        }
    }

}

export default UserController;
