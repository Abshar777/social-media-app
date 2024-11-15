import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface props {
  name: string;
  image?: string;
  latestMessageCount: number;
  latestMesage: string;
  latestMessageTime: string;
  i?:number;
}

const Container = ({
  latestMesage,
  latestMessageCount,
  latestMessageTime,
  name,
  image,
  i
}: props) => {
  const [active, setActive] = useState(false);
  const arrowControls = useAnimationControls();
  const colors = ["cyan", "red", "violet", "zinc", "rose", "sky"];
  useEffect(() => {
    if (latestMessageCount !== 0) setActive(true);
    else setActive(false);
  }, [latestMessageCount]);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{
        delay:(i as number)*0.1
      }}
      layout
      onHoverStart={() => arrowControls.start("hover")}
      onHoverEnd={() => arrowControls.start("initial")}
      className="w-full b flex items-center justify-between px-[.4rem] hover:rounded-sm overflow-hidden py-[2rem] cursor-pointer border-b-[.5px] hover:border-zinc-800 h-[3.5rem] transition-all ease-in-out duration-[.3] hover:bg-zinc-800"
    >
      {/* <button
        className="absolute left-3 scale-[.9]"
        onClick={() => setActive(!active)}
      > */}
      {/* show */}
      {/* </button> */}
      <div className="flex items-center gap-5">
        <div
          className={`circle h-[2.8rem] overflow-hidden flex items-center justify-center w-[2.8rem] rounded-full bg-${
            colors[Math.floor(Math.random() * colors.length)]
          }-500`}
        >
          {image ? (
            <Avatar className="w-full h-full p-0">
              <AvatarImage className="w-full h-full object-cover" src={image} />
              <AvatarFallback>{name.split("").splice(0, 2)}</AvatarFallback>
            </Avatar>
          ) : (
            <h1>{name.split("").splice(0, 2)}</h1>
          )}
        </div>
        <div className="name h-full flex flex-col justify-center">
          <h1>{name}</h1>
          <p
            className={`text-sm transition-all ease-in duration-300 ml-1 ${
              active ? "text-violet-600" : "text-zinc-600"
            }`}
          >
            {latestMesage.split("").splice(0, 20).join("") +
              (latestMesage.length > 20 ? "..." : "")}
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
            {latestMessageTime}
          </motion.p>
          <div key={2} className="flex gap-2">
            <AnimatePresence mode="popLayout">
              {active && (
                <motion.div
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 0.9 }}
                  exit={{ scale: 0, transition: { delay: 0 } }}
                  transition={{ delay: 0.7 }}
                  className="bg-primary flex items-center justify-center rounded-full text-xs w-[1rem] p-[.7rem] h-[1rem]"
                >
                  {latestMessageCount}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.i
              layout
              initial={"initial"}
              animate={arrowControls}
              variants={{
                hover: { marginRight: 0, opacity: 1 },
                initial: {
                  marginRight: active ? -40 : -20,
                  opacity: active ? 1 : 0,
                },
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
