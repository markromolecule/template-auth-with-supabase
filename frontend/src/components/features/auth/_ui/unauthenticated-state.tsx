import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export function UnauthenticatedState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to access this page.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => window.location.href = '/login'} 
              className="w-full"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/register'} 
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

