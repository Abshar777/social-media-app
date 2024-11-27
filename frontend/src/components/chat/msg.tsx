type type =
  | "msg"
  | "image"
  | "replay"
  | "link"
  | "video"
  | "document"
  | "poll"
  | "friend";
import {motion} from "framer-motion";
import { useState } from "react";

const Msg = ({
  id,
  own = true,
  start = false,
  end = false,
  mid = false,
  cont = "",
}: {
  id?: string;
  type?: type;
  own: boolean;
  start?: boolean;
  end?: boolean;
  mid?: boolean;
  cont: string;
}) => {
  const [show, setShow] = useState(false);

  const colors = [{ from: "#FF4B2B", to: "#D4145A" }];
  const index = Math.floor(Math.random() * colors.length);
  return (
    <motion.div
      id={id}
      onHoverStart={() => setShow(!show)}
      onHoverEnd={() => setShow(!show)}
      className={`w-full  px-[.3rem] group py-[.2rem] flex items-center justify-${
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
        className={`
          ${!own && "flex-row-reverse"}
          ${
            !own && "bg-zinc-800 "
          }  cursor-pointer w-fit min-w-[6rem] px-[.5rem] py-[.3rem] flex  ${
          own ? "rounded-l-full" : "rounded-r-full"
        } ${own && start && "rounded-br-full"}  ${
          !own && start && "rounded-bl-full"
        }  ${own && end && "rounded-tr-full"} ${
          !own && end && "rounded-tl-full"
        } ${!mid && !start && !end && "rounded-full"}  max-w-1/2 `}
      >
        <motion.i
          layout
          className={`ri-arrow-down-s-line group-hover:opacity-100 opacity-0 ${
            own ? "-ml-7" : "-mr-7"
          } text-zinc-300 absolute ${""}`}
        ></motion.i>
        <motion.div
          layout
          className={`flex  overflow-hidden justify-start px-1 py-1 relative gap-5`}
        >
          <h1
          // className={`${!own ? "ml-[.5rem]" : "mr-[.5rem]"} ${
          //   show && !own ? "ml-[.8rem]" : "ml-[.5rem]"
          // } ${show && own ? "mr-[1rem]" : "mr-[.5rem]"}`}
          >
            {cont}
          </h1>

          {true && (
            <div className="flex gap-2 mt-1">
              <p className="text-white/40 text-xs ">11:00pm</p>
              <i
                className={`ri-check-double-line ${
                  own ? "text-white/50" : "text-violet-500"
                } leading-none `}
              ></i>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Msg;
