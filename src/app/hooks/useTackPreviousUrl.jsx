'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setPreviousUrl } from '@/store/slices/previousUrlSlice';

export default function useTrackPreviousUrl() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 pathname과 searchParams를 결합하여 완전한 URL 생성
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  // 이전 URL을 저장하기 위한 ref
  const prevUrlRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 처음 마운트 될 때 초기값 저장
    if (prevUrlRef.current === null) {
      prevUrlRef.current = currentUrl;
      dispatch(setPreviousUrl(currentUrl));
      return;
    }

    if (prevUrlRef.current !== currentUrl) {
      dispatch(setPreviousUrl(prevUrlRef.current));
      prevUrlRef.current = currentUrl;
    }
  }, [currentUrl, dispatch]);
}