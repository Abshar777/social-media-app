
import { logout } from "@/api/auth"
import { LogoutUser } from "@/state/auth/authSlice"
import store from "@/state/store"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const logoutService = async () => {
    try {
        await logout()
        localStorage.removeItem("__accessToken")
        toast.success("logout succefully")
    } catch (error) {
        interface data {
            message: string;
        }
        const { message } = (error as AxiosError).response?.data as data;
        toast.error("login failed", { description: message });
    }
}