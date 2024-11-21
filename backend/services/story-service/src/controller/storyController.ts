import { NextFunction, Request, Response } from "express";
import Jwt from "../util/jwt";
import userSchema, { UserDocument } from "../model/userSchema";
import StorySchema from "../model/storySchema"
import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";
import {IStories, IStory} from "../types/interface/IStory";

class StoryController {
  private Jwt: Jwt;
  private UserModel: Model<UserDocument>;
  private StoryModel:Model<IStories>
  private Kafka: MessageBroker;

  constructor() {
    this.Jwt = new Jwt();
    this.UserModel = userSchema;
    this.StoryModel = StorySchema;
    this.Kafka = new MessageBroker();
  }

  // @body  url,caption
  async createStory(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {url,caption=""}=req.body;
      const story=await this.StoryModel.findOneAndUpdate({userId:req.user},{$push:{stories:{url,caption}}},{upsert:true,new:true});
      if(!story) return res.status(400).json({message:"somthing error happend while creating story"});
      const user=await this.UserModel.findByIdAndUpdate(req.user,{$push:{stories:story.stories[story.stories.length-1]._id}},{new:true});
      await this.Kafka.publish("Story-topic",{data:user},Event.UPDATE);
      res.status(200).json({message:"succefully created story",data:story})
    } catch (error) {
      next(error)
    }
  }
  
  // @body  id
  async deletStory(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {id}=req.body;
      const story=await this.StoryModel.findOneAndUpdate({userId:req.user},{$pull:{stories:{_id:id}}});
      if(!story) return res.status(400).json({message:"story not found on this id"});
      const user=await this.UserModel.findByIdAndUpdate(req.user,{$pull:{stories:id}},{new:true});
      await this.Kafka.publish("Story-topic",{data:user},Event.UPDATE);
      res.status(200).json({message:"succefully delted story"})
    } catch (error) {
      next(error)
    }
  }

  // @body  id:storyId,userId
  async seenStory(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {id}=req.body;
      const story=await this.StoryModel.findOneAndUpdate({userId:req.user,"stories._id":id},{$addToSet:{"stories.$.seenBy":req.user}},{new:true});
      if(!story) return res.status(400).json({message:"story not found on this id"});
      res.status(200).json({message:"succefully updated story",data:story})
    } catch (error) {
      next(error)
    }
  }

  // @params id:userId
  async getStory(req:AuthRequest,res:Response,next:NextFunction){
    try {
      const {id}=req.params
      const stories=await this.StoryModel.findOne({userId:id}).populate("userId","name img _id");
      res.status(200).json({message:"succesfully get sotries",data:stories});
    } catch (error) {
      next(error)
    }
  }



}

export default StoryController;
