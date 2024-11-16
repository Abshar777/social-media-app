type type =
  | "msg"
  | "image"
  | "replay"
  | "link"
  | "video"
  | "document"
  | "poll"
  | "friend";
import {
  animate,
  AnimatePresence,
  motion,
  useAnimationControls,
} from "framer-motion";
import { useState } from "react";

const Msg = ({
  id,
  own = true,
  start = true,
  end = false,
  mid = false,
}: {
  id?: string;
  type?: type;
  own: boolean;
  start?: boolean;
  end?: boolean;
  mid?: boolean;
}) => {
  const arrowAnimation = useAnimationControls();
  const [show, setShow] = useState(false);

  const colors = [{ from: "#FF4B2B", to: "#D4145A" }];
  const index = Math.floor(Math.random() * colors.length);
  return (
    <motion.div
      id={id}
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
        }  cursor-pointer w-fit min-w-[6rem] px-[.5rem] py-[.3rem] flex flex-col ${
          own ? "rounded-l-full" : "rounded-r-full"
        } ${start && "rounded-br-full"} ${!own && start && "rounded-bl-full"} ${
          mid && "rounded-full"
        } ${end && "rounded-tr-full"} ${
          !own && end && "rounded-tl-full"
        } ${!end&&!mid&&!start&&"rounded-full"}  max-w-1/2`}
      >
        <motion.div
          layout
          className={`flex ${!own && "flex-col-reverse"} relative gap-3`}
        >
          <h1
            className={`${!own ? "ml-[.5rem]" : "mr-[.5rem]"} ${
              show && !own ? "ml-[.8rem]" : "ml-[.5rem]"
            } ${show && own ? "mr-[1rem]" : "mr-[.5rem]"}`}
          >
            ajjjajajjj
          </h1>
          <AnimatePresence mode="popLayout">
            {show && (
              <motion.i
                layout
                initial={"initial"}
                animate={"hover"}
                variants={{
                  hover: { opacity: 1 },
                  initial: { opacity: 0 },
                }}
                className={`ri-arrow-down-s-line text-zinc-300 absolute ${
                  !own ? "right-[85%]" : "left-[85%]"
                }`}
              ></motion.i>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Msg;
