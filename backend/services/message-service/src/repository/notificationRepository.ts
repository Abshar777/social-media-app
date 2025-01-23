import { Model } from "mongoose";
import { NotificationDocument } from "../model/notificationModel";
import INotification from "../types/interface/INotification";
import IUser from "../types/interface/IUser";

class NotificationRepository {
    private notificationModel: Model<NotificationDocument>;

    constructor(notificationModel: Model<NotificationDocument>) {
        this.notificationModel = notificationModel;
    }

    async createNotification(notificationData: Partial<INotification>): Promise<NotificationDocument> {
        return await this.notificationModel.create(notificationData);
    }

    async getUnreadNotifications(userId: string): Promise<NotificationDocument[]> {
        return await this.notificationModel
            .find({ recipient: userId, isRead: false })
            .sort({ createdAt: -1 })
            .populate('sender', 'name img')
            .populate('post', 'content')
            .populate('comment', 'content');
    }

    async getAllNotifications(userId: string, page: number = 1, limit: number = 10): Promise<NotificationDocument[]> {
        return await this.notificationModel
            .find({ recipient: userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('sender', 'name img')
            .populate('post', 'content')
            .populate('comment', 'content');
    }

    async markAsRead(notificationId: string): Promise<NotificationDocument | null> {
        return await this.notificationModel
            .findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    }

    async markAllAsRead(userId: string): Promise<void> {
        await this.notificationModel
            .updateMany(
                { recipient: userId, isRead: false },
                { isRead: true }
            );
    }

    async deleteNotification(notificationId: string): Promise<NotificationDocument | null> {
        return await this.notificationModel.findByIdAndDelete(notificationId);
    }

    async deleteAllNotifications(userId: string): Promise<void> {
        await this.notificationModel.deleteMany({ recipient: userId });
    }

    async getNotificationCount(userId: string): Promise<number> {
        return await this.notificationModel.countDocuments({
            recipient: userId,
            isRead: false
        });
    }

    async getNotificationById(notificationId: string) {
        return await this.notificationModel
            .findById(notificationId)
            .populate('sender')
            .populate('recipient')
            .populate('post', 'content _id')
            .populate('comment', 'content _id') as NotificationDocument & { recipient: IUser }
    }

    async getFollowRequests(userId: string): Promise<NotificationDocument[]> {
        return await this.notificationModel
            .find({
                recipient: userId,
                type: "FOLLOW_REQUEST",
                isRead: false
            })
            .populate('sender', 'name img')
            .sort({ createdAt: -1 });
    }
}

export default NotificationRepository; 