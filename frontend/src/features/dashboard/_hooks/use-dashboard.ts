import { useLogoutMutation } from '@/hooks/query/auth/use-logout-mutation';
import { toast } from 'sonner';

export function useDashboard() {
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.success('Successfully logged out');
      // Redirect will be handled by auth state change
    },
    onError: (error) => {
      toast.error('Logout failed: ' + error.message);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return {
    logoutMutation,
    handleLogout,
  };
}

