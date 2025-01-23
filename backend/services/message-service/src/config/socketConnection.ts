import  { Server } from "socket.io"
import http from "http";

const connectSocket =  (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    return new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })
}


export default connectSocket;

