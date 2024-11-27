import express from "express"
import MessageController from "../controller/messageController";
import { validate } from '../middleware/validate.Middleware';
import { messageValidators } from '../validator/message.validator';

const router = express.Router();
const messageController = new MessageController();

// send message
router.post(
  '/send', 
  validate(messageValidators.sendMessage), 
  messageController.sendMessage.bind(messageController)
);

// get all messages by chat ID
router.get(
  '/chat', 
  validate(messageValidators.getAllMessageByChatId), 
  messageController.getAllMessageByChatId.bind(messageController)
);

// delete message by ID
router.delete(
  '/delete', 
  validate(messageValidators.deleteMessageById), 
  messageController.deleteMessageById.bind(messageController)
);

// mark message as read
router.put(
  '/read', 
  validate(messageValidators.readMessageById), 
  messageController.readMessageById.bind(messageController)
);

// get all media messages by chat ID
router.get(
  '/media', 
  validate(messageValidators.getAllMediaMessageByChatId), 
  messageController.getAllMediaMessageByChatId.bind(messageController)
);

export default router