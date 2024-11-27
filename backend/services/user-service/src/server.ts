import express from "express";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import Router from "./routes/userRoute";
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
import consumeMessages from "./util/consumeMessages";
import cors from "cors"


config();
dbConnect();
consumeMessages();
const app = express();
const port = process.env.PORT ;
const apiRoot = process.env.API_ROOT || "/api/user-service";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use(apiRoot, Router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("user service running on fucl" + port);
});
