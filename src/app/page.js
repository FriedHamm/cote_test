'use client'

import HeroSection from '@/components/main page/HeroSection';
import CourseSection from '@/components/main page/CourseSection';
import api from "@/axiosConfig";


export default function Home() {


  return (
    <>
      <button onClick={() => {
        api.get('/account/v1/user')
          .then(res => console.log(res));
      }}>누르면 요청됨</button>
      <HeroSection />
      <CourseSection />
    </>
  );
}