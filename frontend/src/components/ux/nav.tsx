import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { RootState } from "../../state/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
const Nav = () => {
  const show=false
  const icon=useAnimationControls()
  const letter=useAnimationControls()
    useEffect(()=>{
      let i=setTimeout(()=>{
        letter.start("first")
      },600)
         i=setTimeout(()=>{
            icon.start("first")
        },800)
        i=setTimeout(()=>{
            icon.start("seco")
        },1600)
       
        return ()=>{
         
          clearTimeout(i)
        }
    },[])
    useEffect(()=>{
      icon.start("seco")
    },[show])
  const colors = [
    { from: "#D4307A", to: "#991CD1" },
    { from: "#D4ADDD", to: "#BE2EBF" },
    { from: "#FF4B2B", to: "#D4145A" },
    { from: "#FDCB30", to: "#F37335" },
    { from: "#A7FF7A", to: "#78FFB6" },
  ];
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const active = true;
  const index = Math.floor(Math.random() * colors.length);
  return (
    <div className="w-full flex items-center px-[2rem] justify-between h-[3rem] border-b-[1px] border-zinc-900">
      <i className="ri-bubble-chart-line block md:hidden"></i>
      <motion.div whileTap={{scale:.9}} className="font-medium h-full overflow-hidden items-center flex md:text-2xl text-xl ">
        {"Regular".split("").map((e, i) => (
          <motion.span
            initial={{ y: 100, scale: 0.5, opacity: 0, rotate: "90deg" }}
            animate={letter}
            variants={{
              first:{ y: 0, scale: 1, opacity: 1, rotate: "0deg" }
            }}
            transition={{
              ease: [0.33, 1, 0.68, 1],
              delay: i * 0.04,
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
            initial:{
              y: 100,
              scale: 0.5,
              opacity: 0,
              rotate: "90deg",
              scaleX: 1,
              scaleY: 1,
            },
            first: {
              y: 0,
              scale: [-1, -1, 0, -1, -1, 0, 0, 0 - 1, 1],
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
      <div className="flex text-xl items-center justify-center gap-4">
        <div className="md:flex h-full hidden  text-xl items-center justify-center gap-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <i
                  className={`ri-chat-1-${
                    active ? "fill " : "line opacity-50"
                  } `}
                ></i>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900">
                <p className="text-sm">Chats</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <i
                  className={`ri-collage-${
                    false ? "fill " : "line opacity-50"
                  }`}
                ></i>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900">
                <p className="text-sm">Story</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <i
                  className={`ri-group-2-${
                    false ? "fill " : "line opacity-50"
                  }`}
                ></i>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900">
                <p className="text-sm">Group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DropdownMenu>
          <div className="flex items-center gap-2">
            <div
              style={{
                background: `linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`,
              }}
              className={`h-[1.9rem] md:scale-[1] scale-[.9] w-[1.9rem] bg-gradient-to-r from-[${colors[index].from}] to-[${colors[index].to}] rounded-full flex items-center justify-center`}
            >
              <p className="text-sm ">{userInfo?.name?.slice(0, 2)}</p>
            </div>
            <p className="text-sm md:block hidden capitalize">
              {userInfo?.name}
            </p>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <i className="ri-arrow-drop-down-line md:ml-0 ml-[-.5rem] cursor-pointer"></i>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="bg-neutral-900" align="end">
            <DropdownMenuLabel>
              <p className="font-normal">Account</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Nav;
