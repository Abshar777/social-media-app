import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ChatInput = () => {
  const addMotion = useAnimationControls();
  const [chat, setChat] = useState("");
  const [send, setsend] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const sendIconClassName = ` ml-1 hover:bg-zinc-800  rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center`;
  useEffect(() => {
    if (!showDropdown) addMotion.start("initial");
    else addMotion.start("animate");
  }, [showDropdown]);
  return (
    <div className="w-full h-full flex px-3 items-center">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <i className="ri-emoji-sticker-line hover:bg-zinc-800 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 `}>Emojis</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu
              onOpenChange={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <div className="">
                  <motion.i
                    animate={addMotion}
                    variants={{
                      initial: { rotate: 0 },
                      animate: { rotate: "180deg" },
                    }}
                    className="ri-apps-2-add-line mr-2 hover:bg-zinc-800  rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"
                  ></motion.i>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-900" align="start">
                <DropdownMenuItem>
                  <i className="ri-article-fill mx-1 text-primary"></i>{" "}
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-gallery-fill mx-1 text-green-700"></i> Galary
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-camera-fill mx-1 text-rose-700"></i> Camera
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-user-fill mx-1 text-orange-500"></i> Friend
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-chat-poll-line mx-1 text-cyan-500"></i> Poll
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 ${showDropdown && "hidden"}`}>
            Add
          </TooltipContent>
        </Tooltip>
        <textarea
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
            if (e.target.value.trim()) setsend(true);
            else setsend(false);
          }}
          placeholder="message heare"
          name=""
          className="resize-none w-full h-[50%] outline-0 rounded-lg py-[.2rem] px-[.5rem] bg-zinc-800"
          id=""
        ></textarea>
        <Tooltip>
          <TooltipTrigger>
            <AnimatePresence mode="popLayout">
              {!send ? (
                <motion.i
                  initial={{ rotate: "90deg" }}
                  animate={{ rotate: "0deg" }}
                  exit={{ rotate: "180deg" }}
                  className={sendIconClassName + " ri-mic-2-line"}
                ></motion.i>
              ) : (
                <motion.i
                  style={{ scaleX: -1 }}
                  exit={{ rotate: "360deg" }}
                  animate={{ rotate: "180deg" }}
                  initial={{ rotate: "360deg" }}
                  className={sendIconClassName + " ri-send-plane-2-line"}
                ></motion.i>
              )}
            </AnimatePresence>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 `}>
            {send ? "send" : "voice"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChatInput;
