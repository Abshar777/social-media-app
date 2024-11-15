import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import { errorHandler, notFound } from "./middleware/errorMiddileware";
import connectDb from "./config/dbConnect";
import cors from "cors"
import cookieParser from 'cookie-parser';
import { writeDetsOfUserInFile } from "./service/configService";
dotenv.config();

connectDb();

const app = express();


// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// route middileware
app.use("/api/users", userRouter);

// error middilware
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listen on ${port}`);
});
