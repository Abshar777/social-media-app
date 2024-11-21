import { IUser } from "./IUser";

export interface IChat {
  _id: string;
  members: IUser[];
  latestMessageCount: number;
  chatName: string | null;
  isGroupChat: boolean;
  latestMessage: string | null;
  groupAdmins: IUser[];
  groupImage: string | null;
  createdAt: string;
  updatedAt: string;
}