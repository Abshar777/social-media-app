import {
    QueryFunction,
    QueryKey,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";

export const useQueryData = <T>(
    queryKey: QueryKey,
    queryFn: QueryFunction,
    options?: Partial<UseQueryOptions>
) => {
    const { data, isLoading, isFetched, refetch, isFetching,isError } = useQuery({
        queryKey,
        queryFn,
        enabled:options?.enabled?options?.enabled:true,
        ...options
    });
    return { data: data as T, isLoading, isFetched, refetch, isFetching,isError };
};
