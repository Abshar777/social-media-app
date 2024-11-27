import { z } from 'zod';

export const userValidators = {
  archiveChat: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  unarchiveChat: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  starMessage: z.object({
    id: z.string().nonempty('Message ID is required'),
  }),

  unstarMessage: z.object({
    id: z.string().nonempty('Message ID is required'),
  }),

  updateStatus: z.object({
    isOnline: z.boolean().default(false),
  }),

  pinChat: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  unpinChat: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  deleteChat: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  searchUser: z.object({
    name: z.string().nonempty('Search term is required'),
  }),

  // Query validators
  getAllArchiveChat: z.object({}).strict(),
  getAllStarredMessage: z.object({}).strict(),
}; 