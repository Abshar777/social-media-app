import { NextFunction, Request, Response } from "express";
import Jwt from "../util/jwt";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";
import { JwtPayload } from "jsonwebtoken";

class UserController {
  private Jwt: Jwt;
  private UserModel: Model<UserDocument>;
  private Kafka: MessageBroker;

  constructor() {
    this.Jwt = new Jwt();
    this.UserModel = userSchema;
    this.Kafka = new MessageBroker();
  }

  //@desc    register user
  //@body    name,email,password
  //@method  POST
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
        const accesToken = this.Jwt.generateAccessToken(user._id as string);
        const refreshToken = this.Jwt.generateRefreshToken(user._id as string);
        await this.Kafka.publish("User-Topic", { data: user }, Event.CREATE);
        res.cookie("__refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        res.status(200).json({
          success: true,
          message: "User successfully created",
          data: user,
          token: accesToken,
        });
      } else {
        res.status(400);
        throw new Error("User not created");
      }
    } catch (err) {
      next(err);
    }
  }

  //@desc    login route
  //@body    email,password
  //@method  POST
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
        const accesToken = this.Jwt.generateAccessToken(user._id as string);
        const refreshToken = this.Jwt.generateRefreshToken(user._id as string);
        res.cookie("__refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        res.status(200).json({
          success: true,
          message: "User successfully logged in",
          data: user,
          token: accesToken
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //@desc    check user
  //@method  GET
  async checkUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user;
      if (!userId) return res.status(400).json({ message: "user not found" });
      const user = await this.UserModel.findById(userId);
      if (!user || user.isBlock) return res.status(400).json({ message: "user not found or user is blocked" });
      const accessToken = this.Jwt.generateAccessToken(user._id as string);
      res.status(200).json({ message: 'user is found', data: user, token: accessToken })
    } catch (error) {
      next(error)
    }
  }

  //@desc    logout user
  //@method  POST
  logoutUser(req: AuthRequest, res: Response) {
    res.cookie("__refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.clearCookie("refreshToken");
    delete req.user;
    res.status(200).json({ message: "User successfully logged out" });
  }

  //@desc    refresh token
  //@method  POST
  async refreshTokenGet(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.__refreshToken;

      if (!refreshToken) {
        console.log('no token')
        res.status(400);
        throw new Error("unothriezed user and user dont have token")
      } else {
        const jwt = new Jwt();
        const { userId } = jwt.verifyRefreshToken(refreshToken) as JwtPayload;
        if (!userId) {
          res.status(400);
          throw new Error("user not found");
        }
        const user = await userSchema.findById(userId);
        if (!user || user.isBlock) {
          console.log('user not found or user is Blocked');
          res.status(400);
          throw new Error("user not found or user is Blocked");
        }
        const token = this.Jwt.generateAccessToken(user._id as string);
        req.user = userId as string;
        res.cookie("__refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          path: "/",
        });
        res.status(200).json({ token, message: "succesfully created token" })
      }
    } catch (error) {
      next(error);
    }
  }

  //@desc    get all users
  //@method  GET
  async getAllUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await userSchema.find().select('-password'); // Exclude password from the response
      res.status(200).json({ message: "Successfully retrieved all users", data: users });
    } catch (error) {
      next(error);
    }
  }

  //@desc    Search user
  //@body    text
  //@method  GET
  async searchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.query;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Invalid search text" });
      }

      const users = await this.UserModel.find({
        $or: [
          { email: { $regex: text, $options: 'i' } },
          { name: { $regex: text, $options: 'i' } }
        ]
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({ message: "Users found", data: users });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
