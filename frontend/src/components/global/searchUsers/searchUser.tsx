import { Button } from "@nextui-org/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { IUser } from "@/types/IUser";
import { motion } from "framer-motion";
import { useMutationData } from "@/hooks/useMutationData";
import { accesOrCreateChat } from "@/api/chat";
import { DialogClose } from "@/components/ui/dialog";
import { LegacyRef, useEffect, useRef } from "react";
// import { inviteMembers } from "@/actions/user";

interface Props {
  user: IUser;
}

const SearchUser = ({ user }: Props) => {
  const { mutate, isPending,isSuccess } = useMutationData(
    ["create-chats"],
    (id: string) => accesOrCreateChat(id),
    "chats"
  );
  const ref=useRef<LegacyRef<HTMLButtonElement>|any>(null)
  useEffect(()=>{
    if(isSuccess) ref.current.click()
  },[isSuccess])
  return (
    <div className="flex gap-x-3 hover:bg-zinc-900/70 bg-zinc-900 hover:border-transparent cursor-pointer transition-all duration-[.3] ease-in-out items-center  w-full p-3 hover:px-4 rounded-xl">
      <DialogClose ref={ref}/>
      <Avatar>
        <AvatarImage src={user.img as string} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <h3 className="text-bold text-md capitalize">{user.name}</h3>
        <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
          {user.email}
        </p>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <Button
          onClick={() => mutate(user._id)}
          isLoading={isPending}
          color="primary"
          className="px-7 border-t group  active:scale-95  transition-all duration-[.3] ease-in  text-xs"
        >
          Chat
          <motion.i className="ri-message-3-fill transition-all ease-in duration-[.3] group-hover:scale-x-[-1] text-lg"></motion.i>
        </Button>
      </div>
    </div>
  );
};

export default SearchUser;
