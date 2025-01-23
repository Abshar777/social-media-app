import express from "express";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import Router from "./routes/storyRoute";
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
import consumeMessages from "./util/consumeMessages";
import authMiddilware from "./middleware/authMiddileware";


config();
dbConnect();
consumeMessages();


const app = express();
const port = process.env.PORT || 3002;
const apiRoot = process.env.API_ROOT || "/api/story-service";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(authMiddilware)
app.use(apiRoot, Router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("story service running on " + port);
});
