import Image from "next/image";

export default function CourseSection() {
  return (
    <section
      className="flex gap-20 bg-gradient-to-r from-[#FFF0F0] to-[#FFFAF0] md:px-20 md:py-28 px-10 py-14 flex-col items-center w-dvw">
      <h2 className="font-heroMain sm:text-4xl sm:font-bold text-2xl font-semibold text-[#476A00]">개발자 취업 성공을 위한 필수 강의 모음</h2>
      <div className="flex items-center w-full justify-around flex-wrap gap-4">
        <a className="flex flex-col items-center gap-4"
           target="_blank"
           href="https://www.inflearn.com/course/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%A0%84%EA%B3%B5%EB%A9%B4%EC%A0%91-cs-%EC%99%84%EC%A0%84%EC%A0%95%EB%B3%B5"
           rel="noopener noreferrer">
          <Image src="/img/course1.png" alt="course1" width="315" height="206"/>
          <h3 className="sm:text-2xl text-xl font-medium">기출로 대비하는<br/>개발자 전공면접</h3>
        </a>

        <a className="flex flex-col items-center gap-4"
           target="_blank"
           href="https://www.inflearn.com/course/%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9E%85%EB%AC%B8-%ED%8C%8C%EC%9D%B4%EC%8D%AC"
           rel="noopener noreferrer">
          <Image src="/img/course2.png" alt="course2" width="316" height="178"/>
          <h3 className="sm:text-2xl text-xl font-medium">코딩테스트 [ALL IN ONE]</h3>
        </a>

        <a className="flex flex-col items-center gap-4"
           target="_blank"
           href="https://www.inflearn.com/course/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%B7%A8%EC%97%85-%EB%B9%84%EB%B0%80-%EB%85%B8%ED%8A%B8"
           rel="noopener noreferrer">
          <Image src="/img/course3.png" alt="course3" width="315" height="206"/>
          <h3 className="sm:text-2xl text-xl font-medium">카카오 퇴사자가 누설하는<br/>[웹개발자 취업 비밀노트]</h3>
        </a>

      </div>
    </section>
  )
}