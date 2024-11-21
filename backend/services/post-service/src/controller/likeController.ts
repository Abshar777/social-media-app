import { NextFunction, Response } from "express";
import Jwt from "../util/jwt";
import { Model } from "mongoose";

import { AuthRequest } from "../types/api";

import { IPost } from "../types/interface/IPost";
import postSchema from "../model/postSchema";

class LikeController {
  private postModel: Model<IPost>;


  constructor() {
    this.postModel = postSchema;
  }

  async likePost(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {id}=req.body;
      const post=await this.postModel.findByIdAndUpdate(id,{ $push: { likes: req.user }},{new:true});
      if(!post) return res.status(400).json({message:"post not found"});
      res.status(200).json({message:"liked post succefully"});
    } catch (error) {
      next(error)
    }
  }

  async UnlikePost(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {id}=req.body;
      const post=await this.postModel.findByIdAndUpdate(id,{ $pull: { likes: req.user }},{new:true});
      if(!post) return res.status(400).json({message:"post not found"});
      res.status(200).json({message:"liked post succefully"});
    } catch (error) {
      next(error)
    }
  }

  async getAllLikedUsers(req:AuthRequest,res:Response,next:NextFunction){
    try {
        const {id}=req.query;
        if(!id) return res.status(400).json({message:"id did'nt get"});
        const post=await this.postModel.findById(id).populate('likes').select({likes:1})
        if(!post) return res.status(400).json({message:"post not found"});
        res.status(200).json({message:"suucefully get post likes",data:post.likes});
    } catch (error) {
        next(error)
    }
  }


}

export default LikeController;
