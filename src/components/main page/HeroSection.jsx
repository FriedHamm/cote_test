'use client'
import Image from 'next/image';
import Link from "next/link";
import axios from "axios";

export default function HeroSection(props) {
  const handleClick = async (e) => {
    const response = await axios.get('https://nossidev.run.goorm.site/account/social-login/login-success');
  }
  return (
    <section
      className="flex md:px-20 md:py-28 px-10 py-14 bg-gradient-to-r from-[#FFFAF0] to-[#FAFFF0] justify-around flex-wrap items-center gap-6">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-heroMain font-bold text-[#B10000] text-5xl">코딩테스트의 모든 것</h1>
          <p className="font-heroSub text-[#D40000] text-2xl">강의와 문제 풀이를 통해 실력을 키우고<br/>커뮤니티와 함께 학습의 폭을 넓혀보세요!</p>
        </div>
        <div className="flex justify-around">
          <a
            href="https://www.inflearn.com/users/348846/@nossi"
            className="bg-[#F0FAFF] py-2 px-4 rounded-lg inline-block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            강의 살펴보기
          </a>
          <button
            href="/"
            className="bg-[#F0F0FF] py-2 px-4 rounded-lg inline-block text-center"
            onClick={handleClick}
          >
            문제 풀러가기
          </button>
        </div>
      </div>
      <Image src="/heroSectionGif.gif" width={540} height={304} alt="visualization of dfs"/>
    </section>
  )
}