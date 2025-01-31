import { useEffect, useRef } from "react";
import img from "../../assets/download.jpg";
import mdImg from "../../assets/New Project 155 [8944589].png";
import ChatInput from "../ui/chatInput";
import ChatNav from "../ui/chatNav";
import Conversation from "../chat/conversation";
import { useQueryData } from "@/hooks/useQuery";
import {  getConverStation } from "@/api/chat";
import { ChatMsgLoading } from "@/pages/loading/chatMsgLoading";
const ConaverstationLayout = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useQueryData(["getChat"], async()=>getConverStation(""));
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (messagesEndRef) {
      setTimeout(scrollToBottom, 1000);
    }
  });

  return (
    <div className="md:w-[80%] w-full relative flex flex-col justify-between h-[90%] md:h-[95%]  overflow-hidden">
      <div className=" w-full h-[4rem] border-b-[1px] ">
        <ChatNav />
      </div>
      <div className=" w-full Interface flex-1 relative overflow-hidden">
        <img
          className="w-full block md:hidden invert absolute opacity-[.02]   object-cover "
          src={img}
          alt=""
        />
        <img
          className="w-full h-full hidden md:block opacity-[.3] absolute   object-cover "
          src={mdImg}
          alt=""
        />
        <div
          ref={messagesEndRef}
          className="w-full   h-full overflow-y-scroll relative  "
        >
          {isLoading ? <ChatMsgLoading /> : <Conversation />}
        </div>
      </div>
      <div className=" w-full md:py-1  md:mb-0 mb-2  py-5 border-t-[1px] ">
        <ChatInput />
      </div>
    </div>
  );
};

export default ConaverstationLayout;
