import { IUser } from "./IUser";

export interface IChat {
  _id: string;
  users: IUser[];
  latestMessageCount: number;
  chatName: string | null;
  isGroupChat: boolean;
  latestMessage: {
    text:string,
    createdAt:Date,
    updatedAt:Date,
    file?:Date,
    
  };
  groupAdmins: IUser[];
  groupImage: string | null;
  createdAt: string;
  updatedAt: string;
}