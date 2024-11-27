import { Outlet } from "react-router-dom";
import ImgCover from "../../components/ux/imgCover";
import video from "../../assets/original-80071a533bd3c78d18f93bf70c273d1a.mp4";
import { useAuthCheck } from "../../hooks/Auth";
import { useEffect, useState } from "react";
import Authloading from "../loading/authLoading";
const Auth = () => {
  const [loading, setLoading] = useState(true);
  useAuthCheck();
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false) 
    },1000)
  }, []);
  return (
    <>
      {loading ? (
        <Authloading />
      ) : (
        <div className="w-full px-5 md:px-0 h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
          <Outlet  />
          
          <ImgCover video={video} />
        </div>
      )}
    </>
  );
};

export default Auth;
