import { IChat } from "@/types/IChat";
import chatDb from "./db/chat.json"

export const getChat = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: true,data:chatDb };
};