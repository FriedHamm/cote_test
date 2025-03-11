'use client'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addAlert } from '@/store/slices/alertSlice';

export default function useAuth(requiredRole = null) {
  const { isLoggedIn, status, role, logoutRequest } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // 인증 체크가 아직 진행 중이면 아무것도 하지 않음
    if (status === 'idle' || status === 'loading') return;

    // 로그인 되어 있지 않다면 로그인 페이지로 리다이렉트
    if (!isLoggedIn && !logoutRequest) {
      router.push('/account/sign-in');
      dispatch(addAlert({ type: 'warning', message: '로그인이 필요합니다.' }));
    } else {
      // requiredRole이 전달되었다면 role을 확인
      if (requiredRole && role !== requiredRole) {
        router.push('/');
        dispatch(addAlert({ type: 'warning', message: '해당 페이지에 접근할 권한이 없습니다.' }));
      } else {
        setAuthChecked(true);
      }
    }
  }, [isLoggedIn, status, role, router, dispatch]);

  return { isLoggedIn, status, authChecked };
}