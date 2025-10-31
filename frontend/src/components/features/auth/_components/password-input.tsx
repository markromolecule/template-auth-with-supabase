import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  className,
}: PasswordInputProps) {
  // Show/hide password toggle
  const [
    showPassword, 
    setShowPassword
  ] = useState(false);

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register}
          className={cn(error && 'border-destructive', 'pr-10')}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            'absolute right-0 top-0 h-full px-3 py-2',
            'hover:bg-transparent'
          )}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

