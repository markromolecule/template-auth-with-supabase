import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface CallbackSuccessProps {
  message: string;
}

export function CallbackSuccess({ message }: CallbackSuccessProps) {
  return (
    <>
      <CardHeader className="text-center">
        <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-600" />
        <CardTitle>Success!</CardTitle>
        <CardDescription className="mt-2">
          {message}
        </CardDescription>
      </CardHeader>
    </>
  );
}

