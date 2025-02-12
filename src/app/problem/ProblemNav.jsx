'use client'
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  MdHistory,
  MdLightbulbOutline,
  MdOutlineDescription,
  MdPeopleOutline
} from "react-icons/md";

export default function ProblemNav() {
  // 현재 경로를 가져와서 배열의 4번째 항목(인덱스 3)을 초기 탭으로 사용
  const pathname = usePathname();
  const [curTab, setCurTab] = useState(pathname.split('/')[3]);
  const router = useRouter();
  const { problemId } = useParams();

  // 탭 전환 함수: 현재 탭과 동일하면 아무 동작 없이 리턴, 아니면 상태 변경 후 페이지 이동
  const handleNavigation = (tab) => {
    if (curTab === tab) return;
    setCurTab(tab);
    router.push(`/problem/${problemId}/${tab}`);
  };

  // 각 버튼에 필요한 정보를 배열로 정의
  const navItems = [
    { tab: "description", label: "문제 설명", icon: MdOutlineDescription },
    { tab: "solution-explanation", label: "문제 해설", icon: MdLightbulbOutline },
    { tab: "community-solution", label: "커뮤니티 문제풀이", icon: MdPeopleOutline },
    { tab: "submission", label: "제출 내역", icon: MdHistory }
  ];

  return (
    <nav className="bg-[#FBF9F4] flex justify-between md:justify-start xl:gap-6 gap-3 px-4 py-2 border-b-[#F7F7F7] border-b border-t-lg overflow-x-scroll">
      {navItems.map(({ tab, label, icon: Icon }) => (
        <button
          key={tab}
          className={`font-semibold text-sm lg:text-base inline-flex gap-1 items-center whitespace-nowrap ${
            curTab === tab ? "text-black" : "text-gray-500"
          }`}
          onClick={() => handleNavigation(tab)}
        >
          <Icon className="lg:w-6 lg:h-6 w-4 h-4" />
          {label}
        </button>
      ))}
    </nav>
  );
}