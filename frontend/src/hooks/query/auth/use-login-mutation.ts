import { type MutationOptions, useMutation } from '@tanstack/react-query';
import { loginData, type LoginDataArgs, type LoginDataResponse } from '@/data/auth/login';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { getProfileData } from '@/data/auth/get-profile';

export type UseLoginMutationArgs = MutationOptions < 
    LoginDataResponse, 
    Error, 
    LoginDataArgs 
>;

export function useLoginMutation(args: UseLoginMutationArgs = {}) {
    const { 
        setUser, 
        setSession, 
        setLoading 
    } = useAuthStore();
    
    return useMutation({
    ...args,
    mutationFn: loginData, // Handle mutation function
    onSuccess: async ( data, variables, context, meta) => { 
        // Set session
        setSession(data.session);
        setLoading(true);

        try {
            // If data is returned => fetch profile
            if (data.user) {
                const profile = await getProfileData({ userId: data.user.id });
                setUser(profile);
            }
        } catch (error) {
            console.error('Hindi ma fetch yung profile:', error);
        } finally {
            setLoading(false);
        }
        args.onSuccess?.(data, variables, context, meta);
    },
    onError: ( error, variables, context, meta ) => {
        setLoading(false);
        // If args is not provided => use default error handler
        if (args?.onError) 
            return args.onError(error, variables, context, meta);
        },
    });
}