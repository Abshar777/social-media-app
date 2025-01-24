import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearch } from "@/hooks/useSearch";
import SearchUser from "./searchUser";
import { useState } from "react";
import { motion } from "framer-motion";

const SerachUsers = () => {
  const { onSearch, onUsers, isLoading, query, clearSerach } = useSearch(
    "get-users",
    "USERS"
  );
  const [focus, setfocus] = useState(true);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full h-[3rem] flex items-center ">
        {focus ? (
          <motion.i
            {...(focus && {
              onClick: clearSerach,
            })}
            initial={{ rotate: "90deg" }}
            animate={{ rotate: "0deg" }}
            exit={{ rotate: "180deg" }}
            className="ri-search-line absolute left-[2rem]"
          ></motion.i>
        ) : (
          <motion.i
            onClick={clearSerach}
            exit={{ rotate: "180deg" }}
            animate={{ rotate: "180deg" }}
            initial={{ rotate: "180deg" }}
            className="ri-arrow-right-line active:scale-[.9] cursor-pointer absolute left-[2rem] scale-[-1]  "
          ></motion.i>
        )}

        <input
          onChange={onSearch}
          onFocus={() => {
            setfocus(!focus);
          }}
          onBlur={() => {
            setfocus(!focus);
          }}
          value={query}
          type="text"
          placeholder="Search"
          className="w-full outline-0 rounded-lg py-[.2rem] px-[3rem] bg-zinc-800/80"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 p-5 rounded-xl" />
          <Skeleton className="w-full h-8 p-5 rounded-xl" />
          <Skeleton className="w-full h-8 p-5 rounded-xl" />
        </div>
      ) : !onUsers ? (
        <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>
      ) : (
        <ScrollArea className="max-h-[15rem] -mt-1">
          <ScrollBar
            className="bg-transparent border-0 border-transparent"
            data-state="hidden"
          />
          <div className="flex flex-col gap-y-3 ">
            {onUsers.map((user) => (
              <SearchUser key={user._id} user={user} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SerachUsers;
