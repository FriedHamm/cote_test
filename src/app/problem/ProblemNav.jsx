'use client'
import { useState } from "react";
import {useParams, useRouter} from "next/navigation";
import {
  MdHistory,
  MdLightbulbOutline,
  MdOutlineDescription,
  MdPeopleOutline
} from "react-icons/md";

export default function ProblemNav() {
  const [curTab, setCurTab] = useState('description');
  const router = useRouter();
  const {problemId} = useParams();

  const handleNavigation = (tab, path) => {
    if(curTab === tab) return;
    setCurTab(tab);
    router.push(`/problem/${problemId}/${path}`);
  };

  return (
    <nav className="bg-[#FBF9F4] flex gap-6 px-4 py-2 border-b-[#F7F7F7] border-b border-t-lg">
      <button
        className={`font-semibold inline-flex gap-1 items-center 
                    ${curTab === 'description' ? 'text-black' : 'text-gray-500'}`}
        onClick={() => handleNavigation('description', 'description')}
      >
        <MdOutlineDescription className="w-6 h-6" />
        문제 설명
      </button>

      <button
        className={`font-semibold inline-flex gap-1 items-center 
                    ${curTab === 'explanation' ? 'text-black' : 'text-gray-500'}`}
        onClick={() => handleNavigation('explanation', 'solution-explanation')}
      >
        <MdLightbulbOutline className="w-6 h-6" />
        문제 해설
      </button>

      <button
        className={`font-semibold inline-flex gap-1 items-center 
                    ${curTab === 'community' ? 'text-black' : 'text-gray-500'}`}
        onClick={() => handleNavigation('community', 'community-solution')}
      >
        <MdPeopleOutline className="w-6 h-6" />
        커뮤니티 문제풀이
      </button>

      <button
        className={`font-semibold inline-flex gap-1 items-center 
                    ${curTab === 'history' ? 'text-black' : 'text-gray-500'}`}
        onClick={() => handleNavigation('history', 'submission')}
      >
        <MdHistory className="w-6 h-6" />
        제출 내역
      </button>
    </nav>
  );
}