import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/api";
import NotificationRepository from "../repository/notificationRepository";
import notificationModel from "../model/notificationModel";
import { ObjectId, Types } from "mongoose";

class NotificationController {
    private notificationRepository: NotificationRepository;

    constructor() {
        this.notificationRepository = new NotificationRepository(notificationModel);
    }

    // @desc    Create a new notification
    // @route   POST /api/notifications
    // @access  Private
    // @body    recipient,type,post?,comment?,message
    async createNotification(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { recipient, type, post, comment, message,userId } = req.body;
            const notification = await this.notificationRepository.createNotification({
                recipient,
                sender:userId  ,
                type,
                post,
                comment,
                message
            });

            res.status(201).json({
                success: true,
                message: "Notification created successfully",
                data: notification
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Get all unread notifications for a user
    // @route   GET /api/notifications/unread
    // @access  Private
    async getUnreadNotifications(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const notifications = await this.notificationRepository.getUnreadNotifications(req.user!);
            
            res.status(200).json({
                success: true,
                message: "Unread notifications retrieved successfully",
                data: notifications
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Get all notifications with pagination
    // @route   GET /api/notifications
    // @access  Private
    // @query   page,limit
    async getAllNotifications(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const notifications = await this.notificationRepository.getAllNotifications(req.user!, page, limit);
            
            res.status(200).json({
                success: true,
                message: "Notifications retrieved successfully",
                data: notifications
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Mark a notification as read
    // @route   PUT /api/notifications/:id/read
    // @access  Private
    // @body    id
    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const notification = await this.notificationRepository.markAsRead(id);
            
            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Notification marked as read",
                data: notification
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Mark all notifications as read
    // @route   PUT /api/notifications/read-all
    // @access  Private
    async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this.notificationRepository.markAllAsRead(req.user!);
            
            res.status(200).json({
                success: true,
                message: "All notifications marked as read"
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Delete a notification
    // @route   DELETE /api/notifications/:id
    // @access  Private
    // @body    id
    async deleteNotification(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const notification = await this.notificationRepository.deleteNotification(id);
            
            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Notification deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Get notification count
    // @route   GET /api/notifications/count
    // @access  Private
    async getNotificationCount(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const count = await this.notificationRepository.getNotificationCount(req.user!);
            
            res.status(200).json({
                success: true,
                message: "Notification count retrieved successfully",
                data: { count }
            });
        } catch (error) {
            next(error);
        }
    }

    // @desc    Get follow requests
    // @route   GET /api/notifications/follow-requests
    // @access  Private
    async getFollowRequests(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const requests = await this.notificationRepository.getFollowRequests(req.user!);
            
            res.status(200).json({
                success: true,
                message: "Follow requests retrieved successfully",
                data: requests
            });
        } catch (error) {
            next(error);
        }
    }
}

export default NotificationController; 