import { NextFunction, Request, Response } from "express";
import Jwt from "../util/jwt";
import userSchema, { UserDocument } from "../model/userSchema";
import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";
import { IPost } from "../types/interface/IPost";
import postSchema from "../model/postSchema";
import IUser from "../types/interface/IUser";
import { IComment } from "../types/interface/IComment";
import commentSchema from "../model/commentSchema";

class CommentController {
    private Jwt: Jwt;
    private UserModel: Model<UserDocument>;
    private postModel: Model<IPost>;
    private commentModel: Model<IComment>;
    private Kafka: MessageBroker;

    constructor() {
        this.Jwt = new Jwt();
        this.UserModel = userSchema;
        this.postModel = postSchema;
        this.commentModel = commentSchema;
        this.Kafka = new MessageBroker();
    }


    // @body  id:productId,content
    async createComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, content } = req.body;
            const post = await this.postModel.findById(id);
            if (!post) return res.status(200).json({ message: "post note found" });
            const comment = await this.commentModel.create({ post: id, userId: req.user, content });
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:commentId
    async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const comment = await this.commentModel.findByIdAndDelete(id);
            res.status(200).json({ message: "succesfully delete comment" });
        } catch (error) {
            next(error)
        }
    }
    
    // @body  id:commentId,content
    async editComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id,content } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id,{$set:{content}});
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully edit comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @query id:postId
    async getAllCommentByPost(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.query;
            const comment = await this.commentModel.find({post:id}).populate("userId","name img _id");
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully get all comment", data: comment });
        } catch (error) {
            next(error)
        }
    }
    
    // @body id:commentId
    async likeComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id,{$push:{likes:req.user},$pull:{unLikes:req.user}},{new:true});
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:commentId
    async unLikeComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id,{$push:{UnLikes:req.user},$pull:{likes:req.user}},{new:true});
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:commentId
    async RemoveUnLikeComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id,{$pull:{unLikes:req.user}},{new:true});
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:commentId
    async RemoveLikeComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id,{$pull:{likes:req.user}},{new:true});
            if(!comment) return res.status(400).json({message:"comment not found"})
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }
    
  
    

}

export default CommentController;
