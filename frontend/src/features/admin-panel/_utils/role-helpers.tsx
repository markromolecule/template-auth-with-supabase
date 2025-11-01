import { UserCog, Shield, Users, Crown } from 'lucide-react';
import type { BadgeProps } from '@/components/ui/badge';
import type { UserRole } from '@/stores/auth/auth.types';

export function getRoleBadgeVariant(role: string): BadgeProps['variant'] {
  switch (role) {
    case 'superadmin':
      return 'destructive';
    case 'admin':
      return 'default';
    case 'staff':
      return 'secondary';
    default:
      return 'outline';
  }
}

export function getRoleIcon(role: string) {
  switch (role) {
    case 'superadmin':
      return <Crown className="h-3 w-3" />;
    case 'admin':
      return <UserCog className="h-3 w-3" />;
    case 'staff':
      return <Shield className="h-3 w-3" />;
    default:
      return <Users className="h-3 w-3" />;
  }
}

