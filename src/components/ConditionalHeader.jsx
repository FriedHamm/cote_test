'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/problem')) {
    return null;
  }

  return <Header />;
}

export function ToggleHeader({isOpen = false}) {
  return (
    <div className={`transition-all duration-500 fixed ${ isOpen ? 'top-0' : '-top-[79px]'} left-0`}>
      <Header isOpen={isOpen}/>
    </div>
  )
}