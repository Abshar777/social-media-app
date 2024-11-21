import express from "express";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import postRouter from "./routes/postRoute";
import likeRouter from "./routes/likeRoute";
import commentRouter from "./routes/commentRouter";
import dbConnect from "./config/dbConnect";
import consumeMessages from "./util/consumeMessages";
import authMiddilware from "./middleware/authMiddileware";
import cookieParser from "cookie-parser"

config();
dbConnect();
consumeMessages();

const app = express();
const port = process.env.PORT || 3001;
const apiRoot = process.env.API_ROOT || "/api/post-service";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(authMiddilware)

// ------------routes-----------------
app.use(apiRoot, likeRouter);
app.use(apiRoot, commentRouter);
app.use(apiRoot, postRouter);
// ------------routes-----------------

// ------------error middilware-----------------
app.use(notFound);
app.use(errorHandler);
// ------------error middilware-----------------

app.listen(port, () => {
  console.log("post service running on " + port);
});
