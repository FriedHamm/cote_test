// pages/page.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroSection from '@/components/main page/HeroSection';
import CourseSection from '@/components/main page/CourseSection';
import {checkAuth} from "@/store/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 페이지가 마운트되면 로그인 상태 API 호출
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <CourseSection />
    </>
  );
}