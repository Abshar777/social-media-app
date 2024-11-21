import express from "express"
import storyController from "../controller/storyController";
const Router =express.Router();
const controller=new storyController();

Router.route('/story')
    // create story
    .post(controller.createStory.bind(controller))

    // delete story 
    .delete(controller.deletStory.bind(controller))

    // seen story update
    .put(controller.seenStory.bind(controller));

// get story by users
Router.get("/story/:id",controller.getStory.bind(controller))

export default Router