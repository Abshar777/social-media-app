import express from "express";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import Router from "./routes/messageRoute";
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
import consumeMessages from "./util/consumeMessages";
import authMiddilware from "./middleware/authMiddileware";


config();
dbConnect();
consumeMessages();

const app = express();
const port = process.env.PORT || 3003;
const apiRoot = process.env.API_ROOT || "/api/message-service";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(authMiddilware)
app.use(apiRoot, Router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("message service running on " + port);
});
