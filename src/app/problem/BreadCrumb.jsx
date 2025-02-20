import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from "next/link";

export default function BreadCrumb({ problemName }) {
  return (
    <nav aria-label="Breadcrumb" className="flex absolute inset-x-0 top-0 z-10 py-3 px-8">
      <ol role="list" className="flex items-center space-x-4">
        {/* Home 아이콘 */}
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500" aria-label="Home">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {/* Static 항목: 코딩테스트 */}
        <li>
          <div className="flex items-center">
            <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
            <Link href="/problems" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-label="문제리스트로 이동">
              코딩테스트
            </Link>
          </div>
        </li>
        {/* 만약 problemName이 있다면 추가로 현재 문제명 표시 */}
        {problemName && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-500" aria-label="current problem">
                {problemName}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}