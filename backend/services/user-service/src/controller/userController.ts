import { NextFunction, Request, Response } from "express";
import Jwt from "../util/jwt";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";
import { writeDetsOfUserInFile } from "../service/configService";

class UserController {
  private Jwt: Jwt;
  private UserModel: Model<UserDocument>;
  private Kafka: MessageBroker;

  constructor() {
    this.Jwt = new Jwt();
    this.UserModel = userSchema;
    this.Kafka = new MessageBroker();
  }


  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const exist = await this.UserModel.findOne({ email });
      if (exist) {
        res.status(400);
        throw new Error("User already exists");
      }
      const user = await this.UserModel.create({ name, email, password });


      if (user) {
        const token = this.Jwt.generateToken(user._id as string);
        await this.Kafka.publish("User-Topic", { data: user }, Event.CREATE)
        //-----------------------start  production code ---------------------------
        writeDetsOfUserInFile(name, email, password);
        //------------------------ end production code ---------------------------

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        res.status(200).json({
          success: true,
          message: "User successfully created",
          data: user,
          token,
        });
      } else {
        res.status(400);
        throw new Error("User not created");
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.UserModel.findOne({ email });
      if (!user) {
        res.status(400);
        throw new Error("User not found");
      }
      const isMatch = user.comparePassword(password);
      if (!isMatch) {
        res.status(400);
        throw new Error("Password is incorrect");
      } else {
        const token = this.Jwt.generateToken(user._id as string);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        res.status(200).json({
          success: true,
          message: "User successfully logged in",
          data: user,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async checkUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user;
      if (!userId) return res.status(400).json({ message: "user not found" });
      const user = await this.UserModel.findById(userId);
      if (!user || user.isBlock) return res.status(400).json({ message: "user not found or user is blocked" });
      res.status(200).json({ message: 'user is found', data: user })
    } catch (error) {
      next(error)
    }
  }

  logoutUser(req: AuthRequest, res: Response) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    delete req.user;
    res.status(200).json({ message: "User successfully logged out" });
  }
}

export default UserController;
