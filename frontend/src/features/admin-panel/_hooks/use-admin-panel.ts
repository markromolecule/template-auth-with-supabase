import { useState } from 'react';
import { toast } from 'sonner';
import type { UserRole } from '@/stores/auth/auth.types';
import type { AdminUser } from '../_types/admin-panel.types';
import { mockUsers } from '../_constants/admin-panel.constants';
import { filterUsers, calculateStats } from '../_utils/user-filters';

export function useAdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success(`User role updated to ${newRole}`);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const filteredUsers = filterUsers(users, searchTerm, roleFilter);
  const stats = calculateStats(users);

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    users,
    filteredUsers,
    stats,
    handleRoleChange,
    handleGoBack,
  };
}

