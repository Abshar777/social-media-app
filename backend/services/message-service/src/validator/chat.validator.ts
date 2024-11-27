import { z } from 'zod';

export const chatValidators = {
  accessChatOrCreateChat: z.object({
    id: z.string().nonempty('User ID is required'),
  }),

  createGroupChat: z.object({
    users: z.array(z.string()).nonempty('At least one user is required'),
    name: z.string().nonempty('Group name is required'),
  }),

  renameGroup: z.object({
    name: z.string().nonempty('New group name is required'),
    id: z.string().nonempty('Group ID is required'),
  }),

  addUser: z.object({
    userId: z.string().nonempty('User ID is required'),
    id: z.string().nonempty('Chat ID is required'),
  }),

  removeUser: z.object({
    userId: z.string().nonempty('User ID is required'),
    id: z.string().nonempty('Chat ID is required'),
  }),

  deleteGroup: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  uploadGroupAvatar: z.object({
    id: z.string().nonempty('Chat ID is required'),
    avatar: z.string().nonempty('Avatar image is required'),
  }),

  deleteGroupAvatar: z.object({
    id: z.string().nonempty('Chat ID is required'),
  }),

  searchChatByName: z.object({
    name: z.string(),
  }),
};
