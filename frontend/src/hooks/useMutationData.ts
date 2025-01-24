import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMutationData = (mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: (data: any) => void
) => {
    const client = useQueryClient()
    const { mutate, isPending,isSuccess } = useMutation({
        mutationKey,
        mutationFn,
        onError(error) {
            toast.error(error.message?.toString())
        },
        onSuccess(data) {
            console.log(data)
            // if (queryKey) client.invalidateQueries({ queryKey: [queryKey] as unknown as readonly unknown[] })
            if (onSuccess) onSuccess(data);
            if (data.Axios_status === 201) return toast.success(data.Axios_message)
            if (data.Axios_status === 200) return ;
            toast.error(data.Axios_message)
        },
        onSettled: async () => {
            console.log("onSettled")
            return await client.invalidateQueries({ queryKey: [queryKey],exact:true })
        }
    })
    return { mutate, isPending,isSuccess }
}


export const useMutationDataState=(mutationKey:MutationKey)=>{
    const data=useMutationState({
        filters:{
            mutationKey
        },
        select(mutation){
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            };
        },
    })
    const latestVaribales=data[data.length-1];
    return {latestVaribales}
}
