'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroSection from '@/components/main page/HeroSection';
import CourseSection from '@/components/main page/CourseSection';
import {checkAuth} from "@/store/slices/authSlice";
import api from "@/axiosConfig";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    api.post('account/v1/auth/social/token/refreshment')
      .then(() => {
        console.log('토큰 리프레시 요청이 성공했습니다.');
      })
      .catch(err => {
        console.log('토큰 리프레시 요청에 실패했습니다.', err);
      });
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <CourseSection />
    </>
  );
}