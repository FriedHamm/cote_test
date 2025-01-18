import Image from "next/image";
import TextEditor from "@/components/texteditor/TextEditor";
import HeroSection from "@/components/main page/HeroSection";
import CourseSection from "@/components/main page/CourseSection";

export default function Home({searchParams}) {
  const code = searchParams?.code;

  if (code) {
    // code 파라미터가 있을 경우, 지정된 URL로 요청 보내기
    fetch(`https://nossidev.run.goorm.site/social-login/callback/?code=${encodeURIComponent(code)}`, {
      method: 'GET', // 필요에 따라 POST 등으로 변경
      // 추가 옵션 설정 가능 (헤더, body 등)
    })
      .then(() => {
        console.log('요청완료');
        // 응답 데이터 처리 로직 추가
      })
      .catch(error => {
        console.error('요청 중 오류 발생:', error);
      });
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
