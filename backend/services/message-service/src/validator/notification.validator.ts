import { z } from 'zod';

export const notificationValidators = {
    createNotification: z.object({
        recipient: z.string().nonempty('Recipient ID is required'),
        type: z.enum(["FOLLOW_REQUEST", "LIKE", "COMMENT", "CALL", "FOLLOW_ACCEPT"], {
            errorMap: () => ({ message: 'Invalid notification type' })
        }),
        post: z.string().optional(),
        comment: z.string().optional(),
        message: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            return val.length > 0;
        }, 'Message cannot be empty if provided')
    }),

    markAsRead: z.object({
        id: z.string().nonempty('Notification ID is required')
    }),

    deleteNotification: z.object({
        id: z.string().nonempty('Notification ID is required')
    }),

    getAllNotifications: z.object({
        page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
        limit: z.string().optional().transform(val => (val ? parseInt(val) : 10))
    }).refine(data => {
        if (data.page && data.page < 1) return false;
        if (data.limit && data.limit < 1) return false;
        return true;
    }, {
        message: "Page and limit must be positive numbers"
    })
}; 