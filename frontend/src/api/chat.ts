
import axiosInstance from "@/util/axios";
import { errorHandler } from "@/lib/utils";

const CHAT_API_ENDPOINT_STARTING = "/api/message-service/chat/";
const USER_API_ENDPOINT_STARTING = "/api/user-service"

export const getChat = async () => {
    try {
        const { data: { data } } = await axiosInstance.get(CHAT_API_ENDPOINT_STARTING + "fetchAllChat");
        return data;
    } catch (error) {
        return errorHandler(error)
    }
};

export const accesOrCreateChat = async (id: string) => {
    try {
        const { data: { data, message }, status } = await axiosInstance.post(CHAT_API_ENDPOINT_STARTING + "/accessChat", { id });
        data.Axios_message = message;
        data.Axios_status = status
        return data;
    } catch (error) {
        return errorHandler(error)
    }
}

export const searchUser = async (text: string) => {
    const { data: { data } } = await axiosInstance.post(USER_API_ENDPOINT_STARTING + "/searchUser", { text });
    return data
}

export const getConverStation = async (chatId: string) => {
    try {
        const { data: { data } } = await axiosInstance.post(CHAT_API_ENDPOINT_STARTING + "/getAllChat", { chatId });
        return data
    } catch (error) {
        return errorHandler(error)
    }
}