import HeroSection from "@/components/main page/HeroSection";
import CourseSection from "@/components/main page/CourseSection";


export default function Home({searchParams}) {
  const code = searchParams?.code;
  const state = searchParams?.state;
  
  // 만약에, redirect 같은게 넘어오면, 얘는 그걸 처리를 못해요.

  if (code && state) {
    location.href = `https://nossidev.run.goorm.site/account/social-login/callback/?code=${code}&state=${state}`
  } else {
    console.log('code 파라미터가 URL에 없습니다.');
  }

  return (
    <>
      <HeroSection/>
      <CourseSection/>
    </>
  );
}
