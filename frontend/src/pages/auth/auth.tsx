import { Outlet } from "react-router-dom";
import ImgCover from "../../components/ux/imgCover";
import video from "../../assets/original-80071a533bd3c78d18f93bf70c273d1a.mp4";
import { useAuthCheck } from "../../hooks/Auth";
import { useEffect, useState } from "react";
import Authloading from "../loading/authLoading";
import { motion, useAnimationControls } from "framer-motion";
const Auth = () => {
  const [loading, setLoading] = useState(true);
  const letter = useAnimationControls();
  const icon = useAnimationControls();
  useEffect(()=>{
    letter.start("first")
    let i = setTimeout(() => {
      icon.start("first");
    }, 800);
    i = setTimeout(() => {
      icon.start("seco");
    }, 1600);
    return ()=>clearTimeout(i)
  })
  useAuthCheck();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      icon.start("seco"); 
    }, 5000);
    return () => clearInterval(interval);
  }, [icon]); 
  return (
    <>
      {loading ? (
        <Authloading />
      ) : (
        <div className="w-full relative bg-dot-white/[.06] gridAnim px-5 md:px-0 h-lvh overflow-hidden  lg:grid  lg:grid-cols-2 ">
          <div className="absolute top-0  p-5">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="font-medium  h-full overflow-hidden items-center flex md:text-2xl text-xl "
            >
              {"Regular".split("").map((e, i) => (
                <motion.span
                  initial={{ y: 100, scale: 0.5, opacity: 0, rotate: "90deg" }}
                  animate={letter}
                  variants={{
                    first: { y: 0, scale: 1, opacity: 1, rotate: "0deg" },
                  }}
                  transition={{
                    ease: [0.33, 1, 0.68, 1],
                    delay: i*0.1,
                    type: "spring",
                    bounce: 0.39,
                  }}
                  key={i}
                >
                  {e}
                </motion.span>
              ))}
              <motion.i
                whileHover={{ scaleX: -1 }}
                initial={"initial"}
                variants={{
                  initial: {
                    y: 100,
                    scale: 0.5,
                    opacity: 0,
                    rotate: "90deg",
                    scaleX: 1,
                    scaleY: 1,
                  },
                  first: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: "0deg",
                  },
                  seco: {
                    scaleX: [-1.3, 1],
                    scaleY: [1.3, 1],
                  },
                }}
                animate={icon}
                transition={{
                  ease: [0.33, 1, 0.68, 1],

                  type: "spring",
                  bounce: 0.39,
                }}
                className="ml-1 text-primary ri-chat-thread-fill scale-[-1]"
              ></motion.i>
            </motion.div>
          </div>
          <Outlet />

          <ImgCover video={video} />
        </div>
      )}
    </>
  );
};

export default Auth;
