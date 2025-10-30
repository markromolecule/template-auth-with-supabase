import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import type { UserRole } from '@/stores/auth/auth.types';

interface UnauthorizedStateProps {
  userRole: UserRole;
  requiredRoles: UserRole[];
}

export function UnauthorizedState({ userRole, requiredRoles }: UnauthorizedStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            You don't have permission to access this page.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm">
              <span className="font-medium">Your role:</span> 
              <span className="capitalize ml-1 px-2 py-1 bg-background rounded-md text-xs">
                {userRole}
              </span>
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium">Required roles:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {requiredRoles.map(role => (
                  <span 
                    key={role} 
                    className="capitalize px-2 py-1 bg-background rounded-md text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="w-full"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

