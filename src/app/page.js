'use client'

import HeroSection from '@/components/main page/HeroSection';
import CourseSection from '@/components/main page/CourseSection';
import api from "@/axiosConfig";
import {useSelector} from "react-redux";


export default function Home() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <>
      <button onClick={() => {
        if (!isLoggedIn) {
          alert('로그인 상태가 아닙니다! 먼저 로그인을 해주세요.');
        }
        api.get('/account/v1/user')
          .then(res => console.log(res));
      }}>누르면 요청됨</button>
      <HeroSection />
      <CourseSection />
    </>
  );
}