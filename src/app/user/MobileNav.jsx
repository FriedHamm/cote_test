import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="lg:hidden flex px-4 py-2 justify-between">
      <Link href="/">계정 관리</Link>
      <Link href="/">활동 내역</Link>
      <Link href="/">코딩테스트 제출 내역</Link>
    </nav>
  )
}