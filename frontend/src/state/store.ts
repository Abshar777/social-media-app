import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {encryptTransform} from "redux-persist-transform-encrypt";

const secret=import.meta.env.VITE_PERSIST_TRANSFORM_ENCRYPT_SECRET ||"fallback-secret-key";
const encryptor = encryptTransform({
  secretKey: secret , 
  onError: (error) => {
    console.error("Encryption error:", error);
  }
});
const persistConfig = {
    key: 'root',
    storage,
    transform:[encryptor]
};

const rootReducer = combineReducers({
    Auth: authSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;