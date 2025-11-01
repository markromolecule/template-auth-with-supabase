import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, User, Key, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { QUICK_ACTIONS } from '../_constants/dashboard.constants';
import type { AuthUser } from '@/stores/auth/auth.types';

interface QuickActionsCardProps {
  user: AuthUser;
}

export function QuickActionsCard({ user }: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => toast.info(QUICK_ACTIONS.EDIT_PROFILE.message)}
        >
          <User className="h-4 w-4 mr-2" />
          {QUICK_ACTIONS.EDIT_PROFILE.label}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => toast.info(QUICK_ACTIONS.CHANGE_PASSWORD.message)}
        >
          <Key className="h-4 w-4 mr-2" />
          {QUICK_ACTIONS.CHANGE_PASSWORD.label}
        </Button>

        {(user.role === 'admin' || user.role === 'superadmin') && (
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = QUICK_ACTIONS.ADMIN_PANEL.path}
          >
            <UserCog className="h-4 w-4 mr-2" />
            {QUICK_ACTIONS.ADMIN_PANEL.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

