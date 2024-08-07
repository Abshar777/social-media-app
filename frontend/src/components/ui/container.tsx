import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useState } from "react";

const Container = () => {
  const [active, setActive] = useState(true);
  const arrowControls = useAnimationControls();

  return (
    <motion.div
      layout
      onHoverStart={() => arrowControls.start("hover")}
      onHoverEnd={() => arrowControls.start("initial")}
      className="w-full b flex items-center justify-between px-[.4rem] hover:rounded-sm overflow-hidden py-[2rem] cursor-pointer border-b-[.5px] hover:border-zinc-800 h-[3.5rem] transition-all ease-in-out duration-[.3] hover:bg-zinc-800"
    >
      <button
        className="absolute left-3 scale-[.9]"
        onClick={() => setActive(!active)}
      >
        show
      </button>
      <div className="flex items-center gap-5">
        <div className="circle h-[2.8rem] flex items-center justify-center w-[2.8rem] rounded-full bg-cyan-500"></div>
        <div className="name h-full flex flex-col justify-center">
          <h1>Abshar</h1>
          <p
            className={`text-sm transition-all ease-in duration-300 ml-1 ${
              active ? "text-violet-600" : "text-zinc-600"
            }`}
          >
            hai
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.p 
          key={1}
            layout
            className={`text-xs ${active ? "text-primary" : "text-zinc-600"}`}
          >
            2:00 PM
          </motion.p>
          <div key={2} className="flex gap-2">
            {/* <AnimatePresence mode="popLayout"> */}
              {active && (
                <motion.div
                
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 0.9 }}
                  exit={{ scale: 0, transition: { delay: 0 } }}
                  transition={{ delay: 0.7 }}
                  className="bg-primary flex items-center justify-center rounded-full text-xs w-[1rem] p-[.7rem] h-[1rem]"
                >
                  2
                </motion.div>
              )}
            {/* </AnimatePresence> */}
            <motion.i
              layout
              initial={"initial"}
              animate={arrowControls}
              variants={{
                hover: { marginRight: 0, opacity: 1 },
                initial: { marginRight: active ? -40 : -20, opacity: active ? 1 : 0 },
              }}
              className="ri-arrow-down-s-line"
            ></motion.i>
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Container;
