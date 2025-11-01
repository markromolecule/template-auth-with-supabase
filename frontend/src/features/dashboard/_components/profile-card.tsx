import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield } from 'lucide-react';
import { getRoleBadgeVariant, getRoleIcon } from '../_utils/role-badge';
import type { AuthUser } from '@/stores/auth/auth.types';

interface ProfileCardProps {
  user: AuthUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              First Name
            </label>
            <p className="font-medium">{user.firstName}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Last Name
            </label>
            <p className="font-medium">{user.lastName}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </label>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Role
          </label>
          <div className="flex items-center gap-2">
            <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
              {getRoleIcon(user.role)}
              <span className="capitalize">{user.role}</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

