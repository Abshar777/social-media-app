import express from 'express';
import ChatController from '../controller/chatController';
import { validate } from '../middleware/validate.Middleware';
import { chatValidators } from '../validator/chat.validator';

const router = express.Router();
const chatController = new ChatController();


// access chat or create chat   
router.post('/access', validate(chatValidators.accessChatOrCreateChat), chatController.accessChatOrCreateChat.bind(chatController));

// fetch all chat
router.get('/fetch', chatController.fetchAllChat.bind(chatController));

// create group chat
router.post('/group', validate(chatValidators.createGroupChat), chatController.createGroupChat.bind(chatController));

// rename group chat
router.put('/rename', validate(chatValidators.renameGroup), chatController.renameGroup.bind(chatController));

// add user to group chat
router.put('/groupadd', validate(chatValidators.addUser), chatController.addUser.bind(chatController));

// remove user from group chat
router.put('/groupremove', validate(chatValidators.removeUser), chatController.removeUser.bind(chatController));

// delete group chat
router.delete('/groupdelete', validate(chatValidators.deleteGroup), chatController.deleteGroup.bind(chatController));

// upload group avatar
router.post('/groupavatar', validate(chatValidators.uploadGroupAvatar), chatController.uploadGroupAvatar.bind(chatController));

// delete group avatar
router.delete('/groupavatar', validate(chatValidators.deleteGroupAvatar), chatController.deleteGroupAvatar.bind(chatController));

// search chat by name or email or user name 
router.get('/search', validate(chatValidators.searchChatByName), chatController.searchChatByName.bind(chatController));

export default router;