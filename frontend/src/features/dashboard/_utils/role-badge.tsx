import { User, Shield, UserCog } from 'lucide-react';
import type { BadgeProps } from '@/components/ui/badge';

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
    case 'admin':
      return <UserCog className="h-4 w-4" />;
    case 'staff':
      return <Shield className="h-4 w-4" />;
    default:
      return <User className="h-4 w-4" />;
  }
}

