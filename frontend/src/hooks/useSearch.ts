import { ChangeEvent, useEffect, useState } from "react"
import { useQueryData } from "./useQuery";
import { IUser } from "@/types/IUser";

export const useSearch = (key: string, type: string) => {
    const [query, setQuery] = useState("");
    const [debounce, setDebounce] = useState("");
    const [onUsers, setOnUsers] = useState<IUser[] | undefined>(undefined)
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const deleyInputTimeOutId = setTimeout(() => {
            setDebounce(query)
        }, 500)
        return () => clearTimeout(deleyInputTimeOutId)
    }, [query])

    const { refetch, isLoading } = useQueryData([key, debounce], async ({ queryKey }) => {
        switch (type) {
            case "USERS":

                break;

            default:
                break;
        }
    })

    useEffect(() => {
        if (debounce) refetch();
        else setOnUsers(undefined);
        return () => {
            debounce
        }
    }, [debounce])

    return { onSearch, isLoading, onUsers,query }
}