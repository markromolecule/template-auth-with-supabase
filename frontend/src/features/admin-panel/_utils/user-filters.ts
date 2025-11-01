import type { AdminUser } from '../_types/admin-panel.types';

export function filterUsers(users: AdminUser[], searchTerm: string, roleFilter: string): AdminUser[] {
  return users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
}

export function calculateStats(users: AdminUser[]) {
  return {
    totalUsers: users.length,
    adminUsers: users.filter(u => u.role === 'admin' || u.role === 'superadmin').length,
    staffUsers: users.filter(u => u.role === 'staff').length,
    regularUsers: users.filter(u => u.role === 'user').length,
  };
}

