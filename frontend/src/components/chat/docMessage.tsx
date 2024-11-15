import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { FaFile } from "react-icons/fa6";
import { useState } from "react";

const DocMessage = ({ own = false }: { own: boolean }) => {


  const colors = [{ from: "#FF4B2B", to: "#D4145A" }];
  const index = Math.floor(Math.random() * colors.length);

  return (
    <motion.div
      id={"aa"}
      className={`w-full px-[.3rem] py-[.2rem] flex items-center justify-${
        !own ? "start" : "end"
      }`}
    >
      <motion.div
       
        layout
        style={{
          background: `${
            own &&
            `linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`
          }`,
        }}
        className={` ${
          !own && "bg-zinc-800"
        }  cursor-pointer  w-fit min-w-[10rem] px-[.5rem] py-[.3rem] flex flex-col justify-start gap-1 items-start ${
          own ? "rounded-l-xl" : "rounded-r-xl"
        } rounded-lg`}
      >
        <div className={`w-full h-1/2 px-2 py-1 flex    text-start rounded-md  ${!own?"bg-foreground-50":"bg-white/20"}`}>
          <div className="h-[90%] pe-3 py-1 grid place-items-center">
            <FaFile size={"1.5rem"} className="mt-1 fill-violet-500 shadow-lg" />
          </div>
          <div className="h-full flex-1 flex flex-col ">
            <p className={` opacity-75 text-sm`}>hello</p>
            <p className=" opacity-50 text-xs">Apk 50mb</p>
          </div>
        </div>
        <motion.div
          layout
          className={`flex w-full justify-between  relative gap-3`}
        >
          <h1
            className={`${!own ? "ml-[.5rem]" : "mr-[.5rem]"} `}
          >
            hi
          </h1>
            <div className="flex">
            <div className="flex gap-2 mt-1">
              <p className="text-white/40 text-xs ">11:00pm</p>
              <i className="ri-check-double-line text-violet-500"></i>
            </div>
            </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DocMessage;
