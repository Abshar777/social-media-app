import { Model } from "mongoose";
import { IMessage } from "../types/interface/IMessage";

class MessageRepository {
    private messageModel: Model<IMessage>;

    constructor(messageModel: Model<IMessage>) {
        this.messageModel = messageModel;
    }

    async createMessage(messageData: Partial<IMessage>): Promise<IMessage> {
        return await this.messageModel.create(messageData);
    }

    async getMessagesByChatId(chatId: string, page: number = 1, limit: number = 50): Promise<IMessage[]> {
        return await this.messageModel
            .find({ 
                chatId,
                isDeleted: false 
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('sender', 'name img')
            .populate('seenBy', 'name img');
    }

    async markMessageAsSeen(messageId: string, userId: string): Promise<IMessage | null> {
        return await this.messageModel
            .findByIdAndUpdate(
                messageId,
                { $addToSet: { seenBy: userId } },
                { new: true }
            );
    }

    async deleteMessage(messageId: string, userId: string): Promise<IMessage | null> {
        return await this.messageModel
            .findByIdAndUpdate(
                messageId,
                { 
                    $addToSet: { deletedBy: userId },
                    isDeleted: true 
                },
                { new: true }
            );
    }

    async getMessageById(messageId: string): Promise<IMessage | null> {
        return await this.messageModel
            .findById(messageId)
            .populate('sender', 'name img')
            .populate('seenBy', 'name img');
    }

    async updateMessage(messageId: string, updateData: Partial<IMessage>): Promise<IMessage | null> {
        return await this.messageModel
            .findByIdAndUpdate(messageId, updateData, { new: true });
    }

    async getUnseenMessagesCount(chatId: string, userId: string): Promise<number> {
        return await this.messageModel.countDocuments({
            chatId,
            seenBy: { $ne: userId },
            isDeleted: false
        });
    }

    async deleteAllMessages(chatId: string): Promise<void> {
        await this.messageModel.updateMany(
            { chatId },
            { isDeleted: true }
        );
    }
}

export default MessageRepository; 