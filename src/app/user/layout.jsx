'use client'

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import MobileNav from "@/app/user/MobileNav";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import {addAlert} from "@/store/slices/alertSlice";
import {useEffect} from "react";
import Link from "next/link";

const userInfo = [
  {id: 1, name: '계정 관리', href: '/user/profile', current: false},
]

const codingtest = [
  {id: 1, name: '계정 관리', href: '/user/profile', current: false},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserLayout({children}) {
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // 로그인 요청이 완료된 후(isLoggedIn가 false일 때)만 리다이렉트
    if (status !== 'loading' && !isLoggedIn) {
      router.push('/account/sign-in');
      dispatch(addAlert({ type: 'warning', message: '로그인이 필요합니다.' }));
    }
  }, [isLoggedIn, status, router, dispatch]);

  // 로그인 여부 확인이 진행중이면 로딩 컴포넌트나 null을 반환
  if (status === 'loading' && status === 'idle') {
    return null; // 또는 <Spinner /> 같은 로딩 컴포넌트를 보여줄 수 있음
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div className="bg-[#FFFAF0] flex flex-col lg:flex-row min-h-screen pt-20">
        <MobileNav/>
        <div className="hidden lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">내 정보</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {userInfo.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >

                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">코딩테스트</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {codingtest.map((team) => (
                      <li key={team.name}>
                        <Link
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="lg:grow">
          {children}
        </main>
      </div>
    </div>

  )
}
