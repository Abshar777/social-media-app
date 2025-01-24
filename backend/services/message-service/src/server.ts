import express from "express";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/error.Middleware";
import MessageRouter from "./routes/messageRoute";
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
import consumeMessages from "./util/consumeMessages";
import authMiddilware from "./middleware/auth.Middleware";
import UserRouter from "./routes/userRoute";
import ChatRouter from "./routes/chatRoute";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize"
import limiter from "./util/rateLimiter";
import socketIoSetup from "./util/socketIo";
import notificatioinRouter from "./routes/notificationRoutes"
import connectSocket from "./config/socketConnection";
import SocketController from "./controller/SocketController";
import userSchema from "./model/userSchema";


process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});



config();
dbConnect();
consumeMessages();

const app = express();
const port = process.env.PORT || 3003;
const apiRoot = process.env.API_ROOT || "/api/message-service";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "*",
  methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  credentials: true,
}))
// app.use(helmet())
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(mongosanitize())

// app.use(limiter)

// auth middleware
app.use(authMiddilware)


// routers
app.use(apiRoot + '/message', MessageRouter);
app.use(apiRoot + "/user", UserRouter);
app.use(apiRoot + '/chat', ChatRouter);
app.use(apiRoot + "/notification", notificatioinRouter);

// error middleware
app.use(notFound);
app.use(errorHandler);



const server = http.createServer(app);



server.listen(port, () => {
  console.log("🟡 message service running on " + port);
});


// ---------------------socket ---------------------

socketIoSetup(server)
// --------------------scoket ---------------------



// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   console.log("UNHANDLED REJECTION! Shutting down ...");
//   server.close(() => {
//     process.exit(1);
//   });
// });