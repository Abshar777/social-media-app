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
    return await axios.get("/api/user-service/check");
}

export const logout = async () => {    
    return await axios.post("/api/user-service/logout");
}

