import type { MutationOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { logoutData } from "@/data/auth/logout";

// Logout Mutation Args
export type UseLogoutMutationArgs = MutationOptions <
    void,
    Error,
    void
>;

// Logout Mutation
export function useLogoutMutation(args: UseLogoutMutationArgs = {}) {
    // Get logout function from auth store
    const logout = useAuthStore((state) => state.logout);
    // Handle mutation
    return useMutation({
        ...args,
        mutationFn: logoutData, // Handle mutation function
        onSuccess: (data, variables, context, meta) => {
            // Logout user
            logout();
            // if args is not provided => use default success handler
            if (args?.onSuccess)
                return args.onSuccess(data, variables, context, meta);
        },
        onError: (error, variables, context, meta) => {
            // if args is not provided => use default error handler
            if (args?.onError) 
                return args.onError(error, variables, context, meta);
        },
    });
}
