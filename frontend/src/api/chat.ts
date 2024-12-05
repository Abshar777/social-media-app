
import chatDb from "./db/chat.json"

export const getChat = async () => {
    
    return { success: true,data:chatDb };
};