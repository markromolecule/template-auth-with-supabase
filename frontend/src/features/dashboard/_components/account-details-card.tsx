import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { formatAccountDate, formatLastLogin } from '../_utils/date-formatters';
import { ACCOUNT_STATUS } from '../_constants/dashboard.constants';

export function AccountDetailsCard() {
  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Account Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Account Status
          </label>
          <Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-950">
            {ACCOUNT_STATUS.ACTIVE}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Member Since
          </label>
          <p className="text-sm">
            {formatAccountDate()}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Last Login
          </label>
          <p className="text-sm">
            {formatLastLogin()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

