import axios, { AxiosError } from "axios"
import { toast } from "sonner"

export const logoutService = async () => {
    try {
        await axios.post("/api/users/logout");
        toast.success("logout succefully")
    } catch (error) {
        interface data {
            message: string;
        }
        const { message } = (error as AxiosError).response?.data as data;
        toast.error("login failed", { description: message });
    }
}