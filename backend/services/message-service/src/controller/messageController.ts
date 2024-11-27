import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { AuthRequest } from "../types/api";
import messageSchema from "../model/messageSchema";
import { IMessage } from "../types/interface/IMessage";

class MessageController {
  private MessageModel: Model<IMessage>;
  
  constructor() {
    this.MessageModel = messageSchema;
  }

  // @desc    send message
  // @method  POST
  // @body    sender:userId,text:message,file:file,type:messageType,chatId:chatId
  async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { sender, text, file, type, chatId } = req.body;
      const message = await this.MessageModel.create({ sender, text, file, type, chatId });
      res.status(200).json({ message: "succefully send message", data: message });
    } catch (error) {
      next(error);
    }
  }

  // @desc    get all message by chatId
  // @method  GET
  // @body    chatId:chatId
  async getAllMessageByChatId(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.query;
      if (!chatId) return res.status(400).json({ message: "chatId is required" });
      const messages = await this.MessageModel.find({ chatId }).populate("sender", "-password").sort({ createdAt: -1 });
      res.status(200).json({ message: "succefully get all message", data: messages });
    } catch (error) {
      next(error);
    }
  }

  // @desc    delete message by id
  // @method  DELETE
  // @body    id:messageId
  async deleteMessageById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "id is required" });
      await this.MessageModel.findByIdAndUpdate(id, { deletedBy: req.user });
      res.status(200).json({ message: "succefully delete message" });
    } catch (error) {
      next(error);
    }
  }

  // @desc    read message by id
  // @method  PUT
  // @body    id:messageId
  async readMessageById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "id is required" });
      await this.MessageModel.findByIdAndUpdate(id, { seenBy: req.user });
      res.status(200).json({ message: "succefully read message" });
    } catch (error) {
      next(error);
    }
  }

  // @desc    get all media message by chatId
  // @method  GET
  // @body    chatId:chatId
  async getAllMediaMessageByChatId(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { chatId } = req.query;
      if (!chatId) return res.status(400).json({ message: "chatId is required" });
      const messages = await this.MessageModel.find({ chatId, type: { $in: ["Video", "Image","Document"] } }).populate("sender", "-password");
      res.status(200).json({ message: "succefully get all media message", data: messages });
    } catch (error) {
      next(error);
    }
  } 


}

export default MessageController;
