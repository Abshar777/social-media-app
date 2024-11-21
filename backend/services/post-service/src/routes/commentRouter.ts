import express from "express"
import CommentController from "../controller/commentController";
import ReplayController from "../controller/replayController";
const Router =express.Router();
const commentController=new CommentController();
const replayController=new ReplayController();


Router.route("/comment")
    // create comment 
    .post(commentController.createComment.bind(commentController))

    // update comment
    .put(commentController.editComment.bind(commentController))

    // delete comment
    .delete(commentController.deleteComment.bind(commentController))

    // get all by post comment
    .get(commentController.getAllCommentByPost.bind(commentController));


Router.route("/replaycomment")
    // create replayComment 
    .post(replayController.createReplayComment.bind(replayController))

    // update replayComment
    .put(replayController.editReplayComment.bind(replayController))

    // delete replayComment
    .delete(replayController.deleteReplayComment.bind(replayController))

    // get all replayComment
    .get(replayController.getReplayComment.bind(replayController));




export default Router