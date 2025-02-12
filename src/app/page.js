'use client'

import HeroSection from '@/components/main page/HeroSection';
import CourseSection from '@/components/main page/CourseSection';
import {useSelector} from "react-redux";




export default function Home() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div>
      <HeroSection />
      <CourseSection />

    </div>
  );
}

