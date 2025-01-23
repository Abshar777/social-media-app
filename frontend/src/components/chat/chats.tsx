import ChatContainer from "./chatContainer";
import ChatContainerLoading from "./chatContainerLoading";
import { IChat } from "@/types/IChat";
import { getChat } from "@/api/chat";
import { useQueryData } from "@/hooks/useQuery";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { lazy,Suspense } from "react";

const ChatAnimtion=lazy(()=>import("@/components/lottie/chatLotiie"))

const Chats = () => {
  const {
    data: chats,
    isLoading,
    isFetched,
  } = useQueryData<IChat[]>(["chats"], getChat);

  return (
    <div className="w-full gridAnim bg-dot-white/[0.06] relative  flex-1 ps-1 pt-1 overflow-y-scroll">
      {isLoading &&
        Array.from({ length: 10 })
          .fill(0)
          .map((_, i) => <ChatContainerLoading key={i} />)}
      {isFetched &&
        chats?.length > 0 &&
        chats.map((e, i) => (
          <ChatContainer
            key={i}
            i={i + 1}
            name={
              e.chatName && e.chatName !== "UNTITLED"
                ? e.chatName
                : e.members[0].name
            }
            image={e.groupImage ? e.groupImage : e.members[0].img}
            latestMesage={e.latestMessage || ""}
            latestMessageCount={e.latestMessageCount}
            latestMessageTime="2:00pm"
          />
        ))}
      {chats?.length == 0 && (
        <div className="w-full h-full flex-col gap-2 flex items-center justify-center">
        <Suspense fallback={<div className="h-[7rem]"></div>}>
          <ChatAnimtion/>
        </Suspense>
          <Button
            isIconOnly
            radius="full"
            color="primary"
            variant="ghost"
            className="group bg-gray-600/10 "
          >
            <motion.i className="ri-add-line "></motion.i>
          </Button>
          <p className="text-violet-600/70 ">start <span className="text-white">chat</span> with <span className="text-white">friends</span></p>
        </div>
      )}
    </div>
  );
};

export default Chats;
