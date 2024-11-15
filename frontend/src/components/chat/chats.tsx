import { useEffect, useState } from "react";
import ChatContainer from "./chatContainer";
import ChatContainerLoading from "./chatContainerLoading";
import { IChat } from "@/types/IChat";
import { getChat } from "@/api/chat";
import { AnimatePresence } from "framer-motion";

const Chats = () => {
  const [loading, setloading] = useState(true);
  const [chats, setchats] = useState<IChat[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getChat();
      setchats(data.chats);
      setloading(false);
    })();
  }, []);
  return (
    <div className="w-full flex-1 ps-1 pt-1 overflow-y-scroll">
      <div onClick={() => {}}>
        <AnimatePresence mode="wait">
          {loading
            ? Array.from({ length: 10 })
                .fill(0)
                .map((_, i) => <ChatContainerLoading key={i} />)
            : chats.map((e,i) => (
                <ChatContainer
                i={i+1}
                  name={e.chatName ? e.chatName : e.members[0].name}
                  image={e.groupImage ? e.groupImage : e.members[0].img}
                  latestMesage={e.latestMessage || ""}
                  latestMessageCount={e.latestMessageCount}
                  latestMessageTime="2:00pm"
                />
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chats;
