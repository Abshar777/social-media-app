
import axiosInstance from "@/util/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

const CHAT_API_ENDPOINT_STARTING = "/api/message-service/chat/";

export const getChat = async () => {
    try {
        const { data: { data } } = await axiosInstance.get(CHAT_API_ENDPOINT_STARTING + "fetchAllChat");
        return data;
    } catch (error) {
        console.log("erroir")
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response && axiosError.response.data)
            ? axiosError.response.data
            : axiosError.message;
        toast.error(`Error while fetching all chat: ${errorMessage}`);
        return { success: false, message: `Error while fetching all chat: ${errorMessage}` };
    }
};

export const accesOrCreateChat = async (id: string) => {
    try {
        const { data: { data }, status } = await axiosInstance.post(CHAT_API_ENDPOINT_STARTING + "/accessChat", { id });
        if (status == 201) toast.success(data.message);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response && axiosError.response.data)
            ? axiosError.response.data
            : axiosError.message;
        toast.error(`Error while fetching all chat: ${errorMessage}`);
        return { success: false, message: `Error while fetching all chat: ${errorMessage}` };
    }
}