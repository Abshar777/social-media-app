import axiosInstance from "@/util/axios"
import axios from "axios"

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
    return await axios.post("/api/user-service/register", {
        email,
        password,
        name: firstName + " " + lastName,
    })
}

export const login = async (email: string, password: string) => {
    return await axios.post("/api/user-service/login", {
        email,
        password,
    })
}


export const check = async () => {        
    const {data:{data,token}}= await axiosInstance.get("/api/user-service/check");
    return data
}

export const logout = async () => {    
    return await axiosInstance.post("/api/user-service/logout");
}

export const getRereshToken=async()=>await axios.post("/api/user-service/token");

