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

class ReplayController {
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


    // @body  id:commmentId,content
    async createReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, content } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id, { $push: { replay: { content, userId: req.user } } }, { new: true });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:commentId,replayId
    async deleteReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId } = req.body;
            const comment = await this.commentModel.findByIdAndUpdate(id, { $pull: { replay: { _id: replayId } } }, { new: true });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully delete comment" });
        } catch (error) {
            next(error)
        }
    }

    // @body  id:replayCommentId,replayId,content
    async editReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId, content } = req.body;
            const comment = await this.commentModel.findOneAndUpdate({ id, "replay._id": replayId }, { "replay.$.content": content }, { new: true });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully  comeditment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    // @query  id:commentId
    async getReplayComment(req:AuthRequest,res:Response,next:NextFunction){
        try {
            const {id}=req.query;
            const comment=await this.commentModel.findById(id).populate("replay.userId","name img");
            if(!comment) return res.status(400).json({message:"comment not found"});
            res.status(200).json({message:"succesfully get comment",data:comment});
        } catch (error) {
            next(error)
        }
    }

    async likeReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId } = req.body;
            const comment = await this.commentModel.findOneAndUpdate({ _id:id, "replay._id": replayId }, { $push: { "replay.$.likes": req.user }, $pull: { "replay.$.unLikes": req.user } });
            if (!comment) return res.status(400).json({ message: "comment not found" });
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    async unLikeReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId } = req.body;
            const comment = await this.commentModel.findOneAndUpdate({ _id:id, "replay._id": replayId }, { $push: { "replay.$.unLikes": req.user }, $pull: { "replay.$.likes": req.user } });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    async RemoveUnLikeReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId } = req.body;
            const comment = await this.commentModel.findOneAndUpdate({ _id:id, "replay._id": replayId }, {  $pull: { "replay.$.unLikes": req.user } });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

    async RemoveLikeReplayComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id, replayId } = req.body;
            const comment = await this.commentModel.findOneAndUpdate({ _id:id, "replay._id": replayId }, {  $pull: { "replay.$.likes": req.user } });
            if (!comment) return res.status(400).json({ message: "comment not found" })
            res.status(200).json({ message: "succesfully create comment", data: comment });
        } catch (error) {
            next(error)
        }
    }

}

export default ReplayController;
