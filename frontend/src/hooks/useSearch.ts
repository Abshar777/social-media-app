import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query"; 
import { useDebounce } from "@/hooks/useDebounce"; 
import { searchUser } from "@/api/chat";
import { IUser } from "@/types/IUser";
import { useQueryData } from "./useQuery";

export const useSearch = (key: string, type: string) => {
    const [query, setQuery] = useState("");

    
    const debouncedQuery = useDebounce(query, 500);

    const clearSerach=()=>setQuery("");

    
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value.trim());
    };

    
    const { data: onUsers, isLoading, isError } = useQueryData<IUser[]>(
        [key, debouncedQuery],
        async () => {
            if (type === "USERS") {
                return await searchUser(debouncedQuery);
            }
            return [];
        },
        {
            enabled: (!!debouncedQuery || query=="") , 
            refetchOnWindowFocus: false, 
            staleTime: 30000, 
            retry: 2, 
        }
    );

    return { onSearch, isLoading, onUsers, isError, query,clearSerach };
};
