import { Card } from '@/components/ui/card';
import { CallbackSuccess } from '@/features/auth-callback/_components/callback-success';
import { CallbackError } from '@/features/auth-callback/_components/callback-error';
import { CallbackLoading } from '@/features/auth-callback/_components/callback-loading';
import { useAuthCallback } from '@/features/auth-callback/_hooks/use-auth-callback';

export function AuthCallback() {
  const { error, success } = useAuthCallback();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {success ? (
          <CallbackSuccess message={success} />
        ) : error ? (
          <CallbackError error={error} />
        ) : (
          <CallbackLoading />
        )}
      </Card>
    </div>
  );
}
