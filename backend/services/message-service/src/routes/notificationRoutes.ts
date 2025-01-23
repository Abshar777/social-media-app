import express from 'express';
import NotificationController from '../controller/notificationController';
import { validate } from '../middleware/validate.Middleware';
import { notificationValidators } from '../validator/notification.validator';

const router = express.Router();
const notificationController = new NotificationController();

// Get all notifications with pagination
router.get('/', 
    validate(notificationValidators.getAllNotifications), 
    notificationController.getAllNotifications.bind(notificationController)
);

// Get unread notifications
router.get('/unread', 
    notificationController.getUnreadNotifications.bind(notificationController)
);

// Get notification count
router.get('/count', 
    notificationController.getNotificationCount.bind(notificationController)
);

// Get follow requests
router.get('/follow-requests', 
    notificationController.getFollowRequests.bind(notificationController)
);

// Create new notification
router.post('/', 
    validate(notificationValidators.createNotification),
    notificationController.createNotification.bind(notificationController)
);

// Mark notification as read
router.put('/:id/read', 
    validate(notificationValidators.markAsRead),
    notificationController.markAsRead.bind(notificationController)
);

// Mark all notifications as read
router.put('/read-all', 
    notificationController.markAllAsRead.bind(notificationController)
);

// Delete notification
router.delete('/:id', 
    validate(notificationValidators.deleteNotification),
    notificationController.deleteNotification.bind(notificationController)
);

export default router; 