import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { UserFilters } from './user-filters';
import { UserManagementTable } from './user-management-table';
import type { AdminUser } from '../_types/admin-panel.types';
import type { UserRole } from '@/stores/auth/auth.types';
import type { AuthUser } from '@/stores/auth/auth.types';

interface UserManagementSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  filteredUsers: AdminUser[];
  currentUser: AuthUser;
  onRoleChange: (userId: string, newRole: UserRole) => void;
}

export function UserManagementSection({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  filteredUsers,
  currentUser,
  onRoleChange,
}: UserManagementSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          roleFilter={roleFilter}
          onRoleFilterChange={onRoleFilterChange}
        />

        <UserManagementTable
          users={filteredUsers}
          currentUser={currentUser}
          onRoleChange={onRoleChange}
        />
      </CardContent>
    </Card>
  );
}

