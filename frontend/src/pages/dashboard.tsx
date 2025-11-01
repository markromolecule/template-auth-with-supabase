import { useAuthStore } from '@/stores/auth/use-auth-store';
import { DashboardHeader } from '@/features/dashboard/_components/dashboard-header';
import { ProfileCard } from '@/features/dashboard/_components/profile-card';
import { QuickActionsCard } from '@/features/dashboard/_components/quick-actions-card';
import { AccountDetailsCard } from '@/features/dashboard/_components/account-details-card';
import { WelcomeMessageCard } from '@/features/dashboard/_components/welcome-message-card';
import { useDashboard } from '@/features/dashboard/_hooks/use-dashboard';

export function Dashboard() {
  const { user } = useAuthStore();
  const { handleLogout, logoutMutation } = useDashboard();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        user={user} 
        onLogout={handleLogout} 
        isLoggingOut={logoutMutation.isPending} 
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProfileCard user={user} />
          <QuickActionsCard user={user} />
          <AccountDetailsCard />
          <WelcomeMessageCard user={user} />
        </div>
      </main>
    </div>
  );
}
