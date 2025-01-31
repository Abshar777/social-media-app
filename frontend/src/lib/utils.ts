import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function errorHandler(error: AxiosError | any) {
  const errorMessage = (error.response && error.response.data)
    ? error.response.data
    : error.message;
  toast.error(`Error while fetching all chat: ${errorMessage}`);
  return { success: false, message: `Error while fetching all chat: ${errorMessage}` };
}
