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
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <CourseSection />
    </>
  );
}