import ChatContainer from "./chatContainer";
import ChatContainerLoading from "./chatContainerLoading";
import { IChat } from "@/types/IChat";
import { getChat } from "@/api/chat";
import { useQueryData } from "@/hooks/useQuery";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import Modal from "../global/modal";
import SerachUsers from "../global/searchUsers";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { formatChatTime } from "@/lib/formatDate";

const ChatAnimtion = lazy(() => import("@/components/lottie/chatLotiie"));

const Chats = () => {
  const {
    data: chats,
    isLoading,
    isFetched,
  } = useQueryData<IChat[]>(["chats"], getChat, { refetchOnWindowFocus: true });
  const { userInfo } = useSelector((state: RootState) => state.Auth);

  const chating = () => {
    return chats.map((e, i) => {
      const index = e.users[0]._id == userInfo?._id ? 1 : 0;
      return (
        <ChatContainer
          key={i}
          i={i + 1}
          name={
            e.chatName && e.chatName !== "UNTITLED"
              ? e.chatName
              : e.users[index].name
          }
          image={e.groupImage ? e.groupImage : e.users[index].img}
          latestMesage={e.latestMessage.text}
          latestMessageCount={e.latestMessageCount}
          latestMessageTime={formatChatTime(e.latestMessage.createdAt)}
        />
      );
    });
  };

  return (
    <div className="w-full gridAnim bg-dot-white/[0.06] relative  flex-1 ps-1 pt-1 overflow-y-scroll">
      {isLoading &&
        Array.from({ length: 10 })
          .fill(0)
          .map((_, i) => <ChatContainerLoading key={i} />)}
      {isFetched && chats?.length > 0 && chating()}
      {chats?.length == 0 && (
        <div className="w-full h-full flex-col gap-2 flex items-center justify-center">
          <Suspense fallback={<div className="h-[7rem]"></div>}>
            <ChatAnimtion />
          </Suspense>
          <Modal
            title="start chat with some one"
            description="start chat with friends and more socielaze with, and create new friends"
            content="start new chat"
            trigger={
              <Button
                isIconOnly
                radius="full"
                color="primary"
                variant="ghost"
                className="group bg-gray-600/10 "
              >
                <motion.i className="ri-add-line "></motion.i>
              </Button>
            }
          >
            <SerachUsers />
          </Modal>
          <p className="text-violet-600/70 ">
            start <span className="text-white">chat</span> with{" "}
            <span className="text-white">friends</span>
          </p>
        </div>
      )}
      {isFetched && chats?.length !== 0 && (
       <div className="absolute bottom-[7%] right-[4%]">
         <Modal
          title="start chat with some one"
          description="start chat with friends and more socielaze with, and create new friends"
          content="start new chat"
          trigger={
            <Button
              isIconOnly
              size="lg"
              radius="full"
              color="primary"
              variant="ghost"
              className="group bg-violet-800 text-wite "
            >
              <motion.i className="ri-add-line "></motion.i>
            </Button>
          }
        >
          <SerachUsers />
        </Modal>
       </div>
      )}
    </div>
  );
};

export default Chats;
