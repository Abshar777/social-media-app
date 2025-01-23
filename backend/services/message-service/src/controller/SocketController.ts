import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import NotificationRepository from "../repository/notificationRepository";
import notificationModel from "../model/notificationModel";
import MessageRepository from "../repository/messageRepository";
import messageSchema from "../model/messageSchema";
import userSchema from "../model/userSchema";
import UserRepository from "../repository/userRepository";

class SocketController {
    private notificationRepository: NotificationRepository;
    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    private messageRepository: MessageRepository;
    private userRepository: UserRepository;
    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.notificationRepository = new NotificationRepository(notificationModel)
        this.io = io;
        this.userRepository = new UserRepository(userSchema);
        this.messageRepository = new MessageRepository(messageSchema);
    }

    // @desc    new  notifiction 
    // @body    id:notificationId
    // @event   newNotification
    // @emit    new_notification
    newNotification = async ({ id }: { id: string }) => {
        try {
            const notification = await this.notificationRepository.getNotificationById(id);
            if (notification && notification.recipient) {
                this.io.to(notification.recipient._id as unknown as string).emit("new_notification", { notification });
                console.log("notification send successfully 🟡")
            } else {
                throw new Error("not valid notificataion")
            }
        } catch (error) {
            console.log("🔴 error while newNotifiaction event on socket err:", (error as Error).message)
        }
    }

    // @desc    new message come recived
    // @body    id:messageId;
    // @event   newMessage
    // @emit    new_message
    newMessage = async ({ id }: { id: string }) => {
        try {
            const message = await this.messageRepository.getMessageById(id);
            if (message && message.chatId && message.chatId.users) {
                this.io.to(message.chatId.users).emit("new_message", { message });
                console.log("message send successfully 🟡")
            } else {
                console.log("not valid notificataion")
            }
        } catch (error) {
            console.log("🔴 error while newNotifiaction event on socket err:", (error as Error).message)
        }
    }


    // @desc    user is typing
    // @body    chatId: string, userId: string
    // @event   typing
    // @emit    user_typing
    userTyping = async ({ chatId, userId }: { chatId: string; userId: string }) => {
        try {
            const user = await this.userRepository.getUserById(userId);
            if (!user) throw new Error('not a valid userId');
            this.io.to(chatId).emit("user_typing", { name: user.name });
            console.log(`User ${user.name} is typing in chat ${chatId} 🟡`);
        } catch (error) {
            console.log("🔴 error while userTyping event on socket err:", (error as Error).message);
        }
    }

    // @desc    user stopped typing
    // @body    chatId: string, userId: string
    // @event   stopTyping
    // @emit    user_stopped_typing
    userStoppedTyping = async ({ chatId, userId }: { chatId: string; userId: string }) => {
        try {
            this.io.to(chatId).emit("user_stopped_typing", { userId });
            console.log(`User ${userId} stopped typing in chat ${chatId} 🟡`);
        } catch (error) {
            console.log("🔴 error while userStoppedTyping event on socket err:", (error as Error).message);
        }
    }






}

export default SocketController