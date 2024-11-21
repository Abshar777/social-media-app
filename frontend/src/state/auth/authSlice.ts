import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "./type";
import { logoutUser, setUser } from "./fn";


const initialState:{userInfo:Tuser | undefined}={
    userInfo:undefined,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:setUser,
        LogoutUser:logoutUser
    }
})

export const {SetUser,LogoutUser}= authSlice.actions
export default authSlice.reducer