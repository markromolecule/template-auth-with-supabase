import type { UserRole } from '@/stores/auth/auth.types';

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: string;
  lastLogin: string;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  adminUsers: number;
  staffUsers: number;
  regularUsers: number;
}

