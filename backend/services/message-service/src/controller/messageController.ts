import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/api";
import MessageRepository from "../repository/messageRepository";
import messageSchema from "../model/messageSchema";

class MessageController {
  private messageRepository: MessageRepository;
  
  constructor() {
    this.messageRepository = new MessageRepository(messageSchema);
  }

  // @desc    send message
  // @method  POST
  // @body    sender:userId,text:message,file:file,type:messageType,chatId:chatId
  async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { sender, text, file, type, chatId } = req.body;
      const message = await this.messageRepository.createMessage({ sender, text, file, type, chatId });
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
      const messages = await this.messageRepository.getMessagesByChatId(chatId as string);
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
      await this.messageRepository.deleteMessage(id as string, req.user as string);
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
      await this.messageRepository.markMessageAsSeen(id as string, req.user as string);
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
      const messages = await this.messageRepository.getMessagesByChatId(chatId as string, 1, 50);
      const mediaMessages = messages.filter(message => ["Video", "Image", "Document"].includes(message.type));
      res.status(200).json({ message: "succefully get all media message", data: mediaMessages });
    } catch (error) {
      next(error);
    }
  } 

}

export default MessageController;
