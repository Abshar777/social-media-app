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


config();
dbConnect();
consumeMessages();

const app = express();
const port = process.env.PORT || 3003;
const apiRoot = process.env.API_ROOT || "/api/message-service";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// auth middleware
app.use(authMiddilware)

// routers
app.use(apiRoot, MessageRouter);
app.use(apiRoot, UserRouter);
app.use(apiRoot, ChatRouter);

// error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("message service running on " + port);
});
