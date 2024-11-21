import express from "express"
import PostController from "../controller/postController";
import authMiddilware from "../middleware/authMiddileware";
const Router =express.Router();
const controller=new PostController()


Router.route("/post")
    // create post 
    .post(controller.creatPost.bind(controller))

    // update post
    .put(controller.updatePost.bind(controller))

    // delete post
    .delete(controller.deletePost.bind(controller))

    // get all post
    .get(controller.getAllPost.bind(controller));

// get post by user id
Router.get('/postByUserId',controller.getPostsByUserId.bind(controller))

// get post by user id
Router.put('/recoverPost',controller.recoverPost.bind(controller))


// get post by folllowers
Router.get('/postByFolllowers',controller.getFollowersPosts.bind(controller))

export default Router