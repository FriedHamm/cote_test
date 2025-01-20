'use client'
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cookies} from "next/headers";

export default function Header() {
  const path = usePathname();
  const cookie = cookies();
  const token = cookie.get('access_token');
  console.log(token);

  if (path.startsWith('/problem')) return null;

  return (
    <header className="bg-[#FFFDFA] border-b border-[#E5E7EB] flex w-dvw py-4 px-16 justify-between items-center">
      <div className="flex items-center md:gap-20 gap-5">
        <Link href="/"className="flex items-center gap-2">
          <Image src="/logo.webp" alt="logo" width={48} height={48}/>
          <p className="font-semibold text-2xl">Nossi.Dev</p>
        </Link>
        <nav className="flex justify-between items-center md:gap-12 gap-4">
          <Link href="/">코딩테스트</Link>
          <Link href="/">커뮤니티</Link>
        </nav>
      </div>
      <Link href="/account/login">로그인</Link>
    </header>
  )
}