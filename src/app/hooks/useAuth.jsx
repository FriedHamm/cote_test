import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addAlert } from '@/store/slices/alertSlice';

export default function useAuth() {
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (status !== 'loading') {
      if (!isLoggedIn) {
        router.push('/account/sign-in');
        console.log('실행됨')
        dispatch(addAlert({ type: 'warning', message: '로그인이 필요합니다.' }));
      } else {
        setAuthChecked(true);
      }
    }
  }, [isLoggedIn, status, router, dispatch]);

  return { isLoggedIn, status, authChecked };
}