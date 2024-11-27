import {
  AnimatePresence,
  motion,
  useAnimationControls,
} from "framer-motion";
import  { useState } from "react";


const Replay = ({ own = false }: { own: boolean }) => {
  const arrowAnimation = useAnimationControls();
  const [show, setShow] = useState(false);

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
        onHoverStart={() => setShow(!show)}
        onHoverEnd={() => setShow(!show)}
        layout
        style={{
          background: `${
            own &&
            `linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`
          }`,
        }}
        className={` ${
          !own && "bg-zinc-800"
        }  cursor-pointer w-fit min-w-[6rem] px-[.5rem] py-[.3rem] flex flex-col justify-start gap-1 items-start ${
          own ? "rounded-l-xl" : "rounded-r-xl"
        } rounded-lg`}
      >
        <div className="w-full h-1/2 px-2 py-1 flex flex-col   text-start rounded-md  bg-foreground-50">
          <p className="text-violet-900 text-xs">you</p>
          <p
            className={` opacity-75 text-sm`}
          >
            hello
          </p>
        </div>
        <motion.div
          layout
          className={`flex  relative gap-10`}
        >
          <h1
            className={`${!own ? "ml-[.5rem]" : "mr-[.5rem]"} ${
              show && !own ? "ml-[.8rem]" : "ml-[.5rem]"
            } ${show && own ? "mr-[1rem]" : "mr-[.5rem]"}`}
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

export default Replay;
