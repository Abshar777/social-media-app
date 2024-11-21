import express from "express"
import likeController from "../controller/likeController";
import CommentController from "../controller/commentController";
import ReplayController from "../controller/replayController";
const Router =express.Router();
const PostLikecontroller=new likeController();
const commentLikecontroller=new CommentController();
const replayCommentLikecontroller=new ReplayController();


// post like 
Router.route('/post/like')
    // getAllLikedUsers
    .get(PostLikecontroller.getAllLikedUsers.bind(PostLikecontroller))

    // like post
    .post(PostLikecontroller.likePost.bind(PostLikecontroller))

    // unlike the post 
    .put(PostLikecontroller.UnlikePost.bind(PostLikecontroller));


// comment like 
Router.route('/comment/like')

    // like commment
    .post(commentLikecontroller.likeComment.bind(commentLikecontroller))

    // remove like  comment
    .put(commentLikecontroller.RemoveLikeComment.bind(commentLikecontroller));


// comment like 
Router.route('/comment/unlike')

    // like commment
    .post(commentLikecontroller.unLikeComment.bind(commentLikecontroller))

    // remove like  comment
    .put(commentLikecontroller.RemoveUnLikeComment.bind(commentLikecontroller));


// replay comment like 

Router.route('/Replaycomment/unlike')

    // like commment
    .post(commentLikecontroller.unLikeComment.bind(commentLikecontroller))

    // remove like  comment
    .put(commentLikecontroller.RemoveUnLikeComment.bind(commentLikecontroller));



export default Router