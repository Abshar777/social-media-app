import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"

const store=configureStore({
    reducer:{
        Auth:authSlice,
    
    }
})


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store