import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { AuthLayout } from '@/components/features/auth/auth-layout';
import { ProtectedRoute, AdminRoute } from '@/components/features/auth/routes/protected-route';
import { Dashboard } from '@/pages/dashboard';
import { AdminPanel } from '@/pages/admin-panel';
import { AuthCallback } from '@/pages/auth-callback';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  const { user, isInitialized } = useAuthStore();

  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes - redirect to dashboard if already authenticated */}
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout initialMode="login" />
            )
          } 
        />
        
        <Route 
          path="/register" 
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout initialMode="register" />
            )
          } 
        />

        {/* OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        
        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            <Navigate to={user ? "/dashboard" : "/login"} replace />
          } 
        />

        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <Navigate to={user ? "/dashboard" : "/login"} replace />
          } 
        />
      </Routes>

      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        duration={4000}
      />
    </>
  );
}

export default App;
