import { useAuthStore } from '@/stores/auth/use-auth-store';
import { AdminHeader } from '@/features/admin-panel/_components/admin-header';
import { StatsCards } from '@/features/admin-panel/_components/stats-cards';
import { UserManagementSection } from '@/features/admin-panel/_components/user-management-section';
import { useAdminPanel } from '@/features/admin-panel/_hooks/use-admin-panel';

export function AdminPanel() {
  const { user } = useAuthStore();
  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers,
    stats,
    handleRoleChange,
    handleGoBack,
  } = useAdminPanel();

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} onGoBack={handleGoBack} />

      <main className="container mx-auto px-4 py-8">
        <StatsCards stats={stats} />

        <UserManagementSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          filteredUsers={filteredUsers}
          currentUser={user}
          onRoleChange={handleRoleChange}
        />
      </main>
    </div>
  );
}
