'use client';
import Spinner from '@/components/Spinner';
import useAuth from "@/app/hooks/useAuth";

export default function AuthGuard({ requiredRole = null, children }) {
  const { status, authChecked } = useAuth(requiredRole);

  if (status === 'idle' || status === 'loading' || !authChecked) {
    return <Spinner />;
  }
  return children;
}