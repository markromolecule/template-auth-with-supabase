import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we verify your authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

