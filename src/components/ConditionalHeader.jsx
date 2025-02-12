'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/problem') && !pathname.startsWith('/problems')) {
    return null;
  }

  return <Header />;
}

export function ToggleHeader({isOpen = false}) {
  return (
    <div className={`transition-transform duration-500 fixed ${ isOpen ? 'top-0' : '-top-[79px]'} left-0 w-screen`}>
      <Header isOpen={isOpen}/>
    </div>
  )
}