import { NextFunction, Request, Response } from "express";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";
import { IPost } from "../types/interface/IPost";
import postSchema from "../model/postSchema";
import IUser from "../types/interface/IUser";

class PostController {
  private UserModel: Model<UserDocument>;
  private postModel: Model<IPost>;
  private Kafka: MessageBroker;

  constructor() {
    this.UserModel = userSchema;
    this.postModel = postSchema;
    this.Kafka = new MessageBroker();
  }


  // @method  post
  // @body    content,description,category
  async creatPost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { content, description, category } = req.body;
      const post = await this.postModel.create({ userId: req.user, content, description, category });
      if (!post) return res.status(400).json({ message: "somthing error happend while creating poste" });
      const user=await this.UserModel.findByIdAndUpdate(req.user,{$inc:{postCount:1}},{new:true})
      await this.Kafka.publish('Post-Topic-User', { data: user }, Event.UPDATE)
      res.status(200).json({ message: "successfully created post", data: post })
    } catch (error) {
      next(error)
    }
  }

  async updatePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { data,id } = req.body;
      const post = await this.postModel.findOneAndUpdate({_id:id}, data, { new: true });
      if (!post) return res.status(400).json({ message: "somthing error happend while creating poste" });
      res.status(200).json({ message: "successfully edited post", data: post })
    } catch (error) {
      next(error)
    }
  }


  async getAllPost(req: AuthRequest, res: Response, next: NextFunction) {
    try {

      const post = await this.postModel.find({isDelete:false,isArchive:false}).populate("userId", "name img _id").sort({ createdAt: -1 })
      res.status(200).json({ message: "successfully get all post", data: post })
    } catch (error) {
      next(error)
    }
  }

  async getFollowersPosts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await this.UserModel.findById(req.user).populate("followers") as IUser;
      if (!user) return res.status(400).json({ message: "user not found" })
      const posts = await this.postModel.find({ userId: { $in: user.followers },isDelete:false,isArchive:false }).populate("userId", "name img").sort({ createdAt: -1 });
      res.status(200).json({ message: "successfully get followers  post", data: posts })
    } catch (error) {
      next(error)
    }
  }

  async getPostsByUserId(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id=req.user;
      const user = await this.UserModel.findById(id).populate("followers") as IUser;
      if (!user) return res.status(400).json({ message: "user not found" })
      const posts = await this.postModel.find({userId:id,isDelete:false,isArchive:false}).populate("userId").sort({ createdAt: -1 });
      res.status(200).json({ message: "successfully get post by user", data: posts })
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const post = await this.postModel.findByIdAndUpdate({ _id: id }, { isDelete: true });

      if (!post) return res.send(400).json({ message: "post not found" });
      const user=await this.UserModel.findByIdAndUpdate(post.userId,{$inc:{postCount:-1}},{new:true})
      await this.Kafka.publish('Post-Topic-User', { data: user }, Event.UPDATE)
      res.status(200).json({ message: "post deleted successfully" })
    } catch (error) {
      next(error)
    }
  }

  async recoverPost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const post = await this.postModel.findByIdAndUpdate({ _id: id }, { isDelete: false });

      if (!post) return res.send(400).json({ message: "post not found" });
      const user=await this.UserModel.findByIdAndUpdate(post.userId,{$inc:{postCount:1}},{new:true})
      await this.Kafka.publish('Post-Topic-User', { data: user }, Event.UPDATE)
      res.status(200).json({ message: " successfully recover the post" })
    } catch (error) {
      next(error)
    }
  }


}

export default PostController;
