import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getRoleBadgeVariant, getRoleIcon } from '../_utils/role-helpers';
import type { AdminUser } from '../_types/admin-panel.types';
import type { UserRole } from '@/stores/auth/auth.types';
import type { AuthUser } from '@/stores/auth/auth.types';

interface UserManagementTableProps {
  users: AdminUser[];
  currentUser: AuthUser;
  onRoleChange: (userId: string, newRole: UserRole) => void;
}

export function UserManagementTable({ 
  users, 
  currentUser, 
  onRoleChange 
}: UserManagementTableProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No users found matching your criteria.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <div className="font-medium">
                  {u.firstName} {u.lastName}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-muted-foreground">
                  {u.email}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(u.role)} className="flex items-center gap-1 w-fit">
                  {getRoleIcon(u.role)}
                  <span className="capitalize">{u.role}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-950">
                  {u.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {new Date(u.lastLogin).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {/* Only show role change if current user is superadmin or changing to lower role */}
                {(currentUser.role === 'superadmin' || 
                  (currentUser.role === 'admin' && u.role !== 'superadmin' && u.role !== 'admin')) && (
                  <Select
                    value={u.role}
                    onValueChange={(value: UserRole) => onRoleChange(u.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      {currentUser.role === 'superadmin' && (
                        <>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
                {currentUser.role === 'admin' && (u.role === 'superadmin' || u.role === 'admin') && (
                  <span className="text-sm text-muted-foreground">No access</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

