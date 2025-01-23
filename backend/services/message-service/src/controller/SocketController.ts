import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import NotificationRepository from "../repository/notificationRepository";
import notificationModel from "../model/notificationModel";
import IUser from "../types/interface/IUser";

class SocketController {
    private notificationRepository: NotificationRepository;
    private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.notificationRepository = new NotificationRepository(notificationModel)
        this.io = io;
    }

    // @desc    new  notifiction 
    // @body    id:notificationId
    // @event   newNotification
    // @emit    new_notification
    newNotification = async ({ id }: { id: string}) => {
        try {
            const notification = await this.notificationRepository.getNotificationById(id);
            if (notification && notification.recipient) {
                this.io.to(notification.recipient._id as unknown as string).emit("new_notification", { notification });
                console.log("notification send successfully 🟡")
            } else {
                console.log("not valid notificataion")
            }
        } catch (error) {
            console.log("🔴 error while newNotifiaction event on socket err:", (error as Error).message)
        }
    }
    
    // @desc    followAccept
    followAccept=async({id}:{ id: string})=>{
        try {
            
        } catch (error) {
            console.log("🔴 error while newNotifiaction event on socket err:", (error as Error).message)
        }
    }





}

export default SocketController