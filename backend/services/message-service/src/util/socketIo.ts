import connectSocket from "../config/socketConnection"
import http from "http";
import SocketController from "../controller/SocketController";
import userSchema from "../model/userSchema";

const socketIoSetup = async (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const io = connectSocket(server);


    // listen when client is connected to socket
    io.on("connection", async (socket) => {
        const socketController = new SocketController(io);
        const userId = socket.handshake.query["userID"]

        console.log("🟡 user conneted to socket from id:", socket.id);

        if (userId && userId !== null && !!userId) {
            try {
                const user = await userSchema.findByIdAndUpdate(userId, {
                    status: "Online",
                    socket_id: socket.id
                })
                if (user) {
                    socket.join(userId)
                    io.to(userId).emit("joined", {
                        message: `🔵 user:${user?.name} joined room `
                    })
                    console.log(`🟢 user data updated , ${user.name} is online`);
                }
                else console.log(" 🔴 user is not updated his status and he not joined in the room ")

            } catch (error) {
                console.log("🔴 error on while updateing user", (error as Error).message)

            }
        } else console.log("🔴 user id is not found ");

        socket.on("newNotification", socketController.newNotification.bind(socketController))
    });


}

export default socketIoSetup