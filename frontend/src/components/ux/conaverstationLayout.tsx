import { useEffect, useRef, useState } from "react";
import img from "../../assets/download.jpg"
import mdImg from "../../assets/New Project 155 [8944589].png"
import ChatInput from "../ui/chatInput";
import ChatNav from "../ui/chatNav";
import Conversation from "./conversation";
const ConaverstationLayout = () => {
  const [arr,setArr]=useState([1,3,4,4,5,6,7]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom=()=>{  messagesEndRef.current?.scrollTo({
    top: messagesEndRef.current?.scrollHeight,
    behavior: 'smooth'
})}
useEffect(()=>{
  if(messagesEndRef){
  setTimeout(scrollToBottom, 1000);  
  }
})

  return (
    <div className="md:w-[80%] w-full relative flex flex-col justify-between h-[90%] md:h-[95%]  overflow-hidden">
      <div className=" w-full h-[4rem] border-b-[1px] ">
        <ChatNav/>
      </div>  
      <div className=" w-full Interface flex-1 relative overflow-hidden">
          <img className="w-full block md:hidden invert absolute opacity-[.02]   object-cover " src={img} alt="" />
          <img className="w-full h-full hidden md:block opacity-[.3] absolute   object-cover " src={mdImg} alt="" />
        <div ref={messagesEndRef} className="w-full   h-full overflow-y-scroll relative  ">
          <Conversation />
        </div>
      </div>
      <div className=" w-full md:py-1  md:mb-0 mb-2  py-5 border-t-[1px] ">
        <ChatInput/>
      </div>
      {/* <button onClick={()=>{
        setArr([...arr,Math.floor(Math.random()*10)])
    }} className="btn rounded-md p-[.1rem] mb-2 absolute bottom-0 bg-primary">create</button>
    */}
    </div>
  );
};

export default ConaverstationLayout;
