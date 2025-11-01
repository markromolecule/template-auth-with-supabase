import type { RegisterDataArgs } from "@/data/auth/register";
import type { RegisterDataResponse } from "@/data/auth/register";
import type { MutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { registerData } from "@/data/auth/register";

// Register Mutation Args
export type UseRegisterMutationArgs = MutationOptions <
    RegisterDataResponse,
    Error,
    RegisterDataArgs
>;

// Register Mutation
export function useRegisterMutation(args: UseRegisterMutationArgs = {}) {
    return useMutation({
        ...args,
        mutationFn: registerData,
        onSuccess: (data, variables, context, meta) => {
            if (args?.onSuccess)
                return args.onSuccess(data, variables, context, meta);
        },
        onError: (error, variables, context, meta) => {
            if (args?.onError) 
                return args.onError(error, variables, context, meta);
        },
    });
}
