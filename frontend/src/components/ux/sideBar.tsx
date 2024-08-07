import { useState } from "react";
import { Badge } from "../ui/badge"
import {motion} from "framer-motion"
import User from "../client/user";
const SideBar = () => {
  const [focus, setfocus] = useState(true);
  return (
    <motion.div layout className="md:w-[20rem] w-0 overflow-hidden relative  flex flex-col items-center  h-full md:border-r-[1px]">
      <div className="nav w-full gap-2 relative flex flex-col justify-center h-[6rem] px-[1rem] pt-[1rem] pb-[.5rem] border-b-[1px]">
       <div className="w-full h-[3rem] flex items-center ">
       {focus ? (
        <motion.i
          initial={{ rotate: "90deg" }}
          animate={{ rotate: "0deg" }}
          exit={{ rotate: "180deg" }}
          className="ri-search-line absolute left-[1.5rem]"
        ></motion.i>
      ) : (
        <motion.i
          exit={{ rotate: "180deg" }}
          animate={{ rotate: "180deg" }}
          initial={{ rotate: "180deg" }}
          className="ri-arrow-right-line absolute left-[1.5rem] scale-[-1]  "
        ></motion.i>
      )}
      
        <input
         onFocus={() => {
          setfocus(!focus);
        }}
        onBlur={() => {
          setfocus(!focus);
        }}
          type="text"
          placeholder="Search"
          className="w-full outline-0 rounded-lg py-[.2rem] px-[3rem] bg-zinc-800"
        />
       </div>
        <div className="w-full h-[2rem] flex items-center gap-2 px-1 ">
          <Badge variant={"default"} style={{transition:"all ease 0.3s"}}  className="font-normal  active:scale-[.9] cursor-pointer ">All</Badge>
          <Badge variant={"secondary"} style={{transition:"all ease 0.3s"}}  className="font-normal active:scale-[.9] cursor-pointer bg-zinc-800">Unread</Badge>
          <Badge variant={"secondary"} style={{transition:"all ease 0.3s"}}  className="font-normal active:scale-[.9] cursor-pointer bg-zinc-800">Groups</Badge>
          <Badge variant={"secondary"} style={{transition:"all ease 0.3s"}}  className="font-normal active:scale-[.9] cursor-pointer bg-zinc-800">Status</Badge>
        </div>
      </div>
      <User/>
    </motion.div>
  );
};

export default SideBar;
