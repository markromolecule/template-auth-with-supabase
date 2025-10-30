import type { MutationOptions } from "@tanstack/react-query";
import type { OAuthProviderArgs } from "@/data/auth/oauth";
import type { OAuthProviderResponse } from "@/data/auth/oauth";
import { useMutation } from "@tanstack/react-query";
import { oauthLoginData } from "@/data/auth/oauth";

// Types for OAuth
export type UseOAuthMutationArgs = MutationOptions <
    OAuthProviderResponse,
    Error,
    OAuthProviderArgs
>;

export function useOAuthMutation(args: UseOAuthMutationArgs = {}) {
    return useMutation({
        ...args,
        mutationFn: oauthLoginData, // Handle mutation function
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