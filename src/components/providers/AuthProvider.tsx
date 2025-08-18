'use client';

import { ReactNode } from 'react';
import { AuthContext, useAuthState } from '@/lib/hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}