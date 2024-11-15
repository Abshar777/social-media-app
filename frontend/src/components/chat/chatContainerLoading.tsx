import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
const ChatContainerLoading = () => {
  return (
    <motion.div exit={{opacity:0}} className="w-full b flex items-center gap-1 px-[.4rem] hover:rounded-sm overflow-hidden py-[2rem] cursor-pointer  hover:border-zinc-800 h-[3.5rem] transition-all ease-in-out duration-[.3] ">
      <Skeleton className="h-[2.5rem] w-[2.5rem] rounded-full" />
      <div className="flex flex-1 flex-col  gap-2">
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </motion.div>
  );
};

export default ChatContainerLoading;
