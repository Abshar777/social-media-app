import express from 'express';
import UserController from '../controller/userController';
import { validate } from '../middleware/validate.Middleware';
import { userValidators } from '../validator/user.validator';

const router = express.Router();
const userController = new UserController();

// Archive related routes
router.post('/archive', validate(userValidators.archiveChat), userController.archiveChat.bind(userController));
router.get('/archive', validate(userValidators.getAllArchiveChat), userController.getAllArchiveChat.bind(userController));
router.put('/unarchive', validate(userValidators.unarchiveChat), userController.unarchiveChat.bind(userController));

// Star message related routes
router.get('/starred', validate(userValidators.getAllStarredMessage), userController.getAllStarredMessage.bind(userController));
router.put('/star', validate(userValidators.starMessage), userController.starMessage.bind(userController));
router.put('/unstar', validate(userValidators.unstarMessage), userController.unstarMessage.bind(userController));

// User status route
router.put('/status', validate(userValidators.updateStatus), userController.updateStatus.bind(userController));

// Pin chat related routes
router.put('/pin', validate(userValidators.pinChat), userController.pinChat.bind(userController));
router.put('/unpin', validate(userValidators.unpinChat), userController.unpinChat.bind(userController));

// Chat deletion route
router.delete('/chat', validate(userValidators.deleteChat), userController.deleteChat.bind(userController));

// User search route
router.get('/search', validate(userValidators.searchUser), userController.searchUser.bind(userController));

export default router; 