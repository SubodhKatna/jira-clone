import {InferResponseType} from "hono";

import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    return useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();
            return await response.json();
        },
    });
};