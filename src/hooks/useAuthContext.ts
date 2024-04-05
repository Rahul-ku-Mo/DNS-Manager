import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/context/AuthContext';

export const useAuthContext = (): AuthContextType  => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext is not provided');
  }
  return context;
}