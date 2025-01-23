import { Model } from "mongoose";
import { UserDocument } from "../model/userSchema";

class UserRepository {
    private userModel: Model<UserDocument>;

    constructor(userModel: Model<UserDocument>) {
        this.userModel = userModel;
    }

    async createUser(userData: Partial<UserDocument>): Promise<UserDocument> {
        return await this.userModel.create(userData);
    }

    async getUserById(userId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findById(userId)
            .select('-password')
            .populate('followers', 'name img')
            .populate('following', 'name img')
            .populate('stories');
    }

    async updateUser(userId: string, updateData: Partial<UserDocument>): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(userId, updateData, { new: true })
            .select('-password');
    }

    async updateSocketId(userId: string, socketId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { 
                    socket_id: socketId,
                    isOnline: true,
                    status: "Online"
                },
                { new: true }
            );
    }

    async updateOnlineStatus(userId: string, isOnline: boolean): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { 
                    isOnline,
                    status: isOnline ? "Online" : "Offline",
                    latestOnline: isOnline ? undefined : new Date()
                },
                { new: true }
            );
    }

    async followUser(userId: string, followId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $addToSet: { following: followId } },
                { new: true }
            );
    }

    async unfollowUser(userId: string, unfollowId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $pull: { following: unfollowId } },
                { new: true }
            );
    }

    async searchUsers(query: string, limit: number = 10): Promise<UserDocument[]> {
        return await this.userModel
            .find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ],
                isBlock: false
            })
            .select('name email img bio')
            .limit(limit);
    }

    async updateUserArchiveChat(userId: string, chatId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $addToSet: { archiveChat: chatId } },
                { new: true }
            );
    }

    async removeUserArchiveChat(userId: string, chatId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $pull: { archiveChat: chatId } },
                { new: true }
            );
    }

    async addStarredMessage(userId: string, messageId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $addToSet: { starredMessage: messageId } },
                { new: true }
            );
    }

    async removeStarredMessage(userId: string, messageId: string): Promise<UserDocument | null> {
        return await this.userModel
            .findByIdAndUpdate(
                userId,
                { $pull: { starredMessage: messageId } },
                { new: true }
            );
    }
}

export default UserRepository; 