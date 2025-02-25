import Spinner from '@/components/Spinner';
import useAuth from "@/app/hooks/useAuth";

export default function AuthGuard({ children }) {
  const { status, authChecked } = useAuth();

  if (status === 'loading' || !authChecked) {
    return <Spinner />;
  }
  return children;
}