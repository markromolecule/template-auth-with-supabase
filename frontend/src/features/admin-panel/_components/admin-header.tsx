import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings } from 'lucide-react';
import { getRoleBadgeVariant, getRoleIcon } from '../_utils/role-helpers';
import type { AuthUser } from '@/stores/auth/auth.types';

interface AdminHeaderProps {
  user: AuthUser;
  onGoBack: () => void;
}

export function AdminHeader({ user, onGoBack }: AdminHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Manage users, roles, and system settings
              </p>
            </div>
          </div>
          <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
            {getRoleIcon(user.role)}
            <span className="capitalize">{user.role}</span>
          </Badge>
        </div>
      </div>
    </header>
  );
}

