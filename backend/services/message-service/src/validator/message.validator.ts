import { z } from 'zod';

export const messageValidators = {
  sendMessage: z.object({
    sender: z.string().nonempty('Sender ID is required'),
    text: z.string().optional(),
    file: z.string().optional(),
    type: z.enum(['Text', 'Image', 'Video', 'Document']),
    chatId: z.string().nonempty('Chat ID is required'),
  }),

  getAllMessageByChatId: z.object({
    chatId: z.string().nonempty('Chat ID is required'),
  }),

  deleteMessageById: z.object({
    id: z.string().nonempty('Message ID is required'),
  }),

  readMessageById: z.object({
    id: z.string().nonempty('Message ID is required'),
  }),

  getAllMediaMessageByChatId: z.object({
    chatId: z.string().nonempty('Chat ID is required'),
  }),
};
