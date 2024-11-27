import { check } from "@/api/auth";
import ChatLoading from "@/pages/loading/chatPartLoading";
import { LogoutUser, SetUser } from "@/state/auth/authSlice";
import { AppDispatch } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false) 
    },1000)
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading,isSuccess,isError,data,error} = useQuery({ queryKey: ["user"], queryFn: check });
  if(isLoading&&loading) return <ChatLoading/>
  if(isSuccess){ 
    dispatch(SetUser(data));
    return <Outlet/>}
  if(isError){
    toast.error("protected route error",{description:error.message})
    dispatch(LogoutUser())
    return <Navigate to={"/auth/login"}/>
  }
};

export default ProtectedRoute;
