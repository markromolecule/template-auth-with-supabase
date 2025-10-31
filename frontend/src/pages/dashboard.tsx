import { useAuthStore } from '@/stores/auth/use-auth-store';
import { useLogoutMutation } from '@/hooks/query/auth/use-logout-mutation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  LogOut, 
  Settings, 
  Key,
  UserCog 
} from 'lucide-react';
import { toast } from 'sonner';

export function Dashboard() {
  const { user } = useAuthStore();
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.success('Successfully logged out');
      // Redirect will be handled by auth state change
    },
    onError: (error) => {
      toast.error('Logout failed: ' + error.message);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'staff':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin':
      case 'admin':
        return <UserCog className="h-4 w-4" />;
      case 'staff':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.firstName} {user.lastName}!
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Information */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    First Name
                  </label>
                  <p className="font-medium">{user.firstName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Name
                  </label>
                  <p className="font-medium">{user.lastName}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <p className="font-medium">{user.email}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Role
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
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
                onClick={() => toast.info('Profile editing coming soon!')}
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast.info('Password change coming soon!')}
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>

              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/admin'}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Account Stats */}
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
                  Active
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-sm">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Last Login
                </label>
                <p className="text-sm">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Welcome Message */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    Welcome to your dashboard, {user.firstName}!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This is your central hub for managing your account and accessing all available features. 
                    Your current role is <span className="font-medium capitalize">{user.role}</span>, 
                    which gives you access to specific features and permissions.
                  </p>
                  {user.role === 'user' && (
                    <p className="text-sm text-muted-foreground">
                      Contact an administrator if you need additional permissions or have questions about your account.
                    </p>
                  )}
                  {(user.role === 'admin' || user.role === 'superadmin') && (
                    <p className="text-sm text-muted-foreground">
                      As an administrator, you have access to the admin panel for managing users and system settings.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
