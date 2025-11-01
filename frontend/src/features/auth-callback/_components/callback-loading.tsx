import { CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function CallbackLoading() {
  return (
    <CardContent className="p-8 text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
      <h2 className="text-lg font-semibold mb-2">Completing Authentication</h2>
      <p className="text-muted-foreground text-sm">
        Please wait while we finish setting up your account...
      </p>
    </CardContent>
  );
}

