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
    // 아직 인증 체크가 시작되지 않았거나 진행 중일 경우에는 아무것도 하지 않음
    if (status === 'idle' || status === 'loading') return;

    // 인증 체크가 완료된 후 처리
    if (!isLoggedIn) {
      router.push('/account/sign-in');
      dispatch(addAlert({ type: 'warning', message: '로그인이 필요합니다.' }));
    } else {
      setAuthChecked(true);
    }
  }, [isLoggedIn, status, router, dispatch]);

  return { isLoggedIn, status, authChecked };
}