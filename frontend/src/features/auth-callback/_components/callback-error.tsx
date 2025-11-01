import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CallbackErrorProps {
  error: string;
}

export function CallbackError({ error }: CallbackErrorProps) {
  const navigate = useNavigate();

  return (
    <>
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <CardTitle>Authentication Error</CardTitle>
        <CardDescription className="mt-2">
          {error}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => navigate('/login', { replace: true })} 
          className="w-full"
        >
          Return to Login
        </Button>
      </CardContent>
    </>
  );
}

