import React from "react";
import { Button } from "@nextui-org/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { IUser } from "@/types/IUser";
// import { useMutationData } from "@/hooks/useMutation";
// import { inviteMembers } from "@/actions/user";

interface Props {
  user: IUser;
}

const SearchUser = ({ user }: Props) => {
  //   const { mutate, isPending } = useMutationData(
  //     ["invite-member"],
  //     (data: { recieverId: string; email: string }) =>
  //       inviteMembers(workspaceId, data.recieverId, data.email)
  //   );
  return (
    <div className="flex gap-x-3 hover:bg-primary-foreground cursor-pointer transition-all duration-[.3] ease-in items-center border-[1px] w-full p-2 rounded-xl">
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
          //   onClick={() => mutate({ recieverId: user.id, email: user.email })}
          // variant={"solid"}
          isLoading={false}
          color="primary"
          className="px-7 border-t  active:scale-95 transition-all duration-[.3] ease-in  text-xs"
        >
          Chat
        </Button>
      </div>
    </div>
  );
};

export default SearchUser;
