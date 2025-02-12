import Pagination from "rc-pagination";
import PaginationWrapper from "@/components/Pagination";

export default function Problems() {
  return (
    <div className="overflow-y-auto min-h-screen">
      <Problemstable/>
      <PaginationWrapper/>
    </div>
  )
}

function Problemstable() {
  return (
    <div className="bg-gradient-to-b from-[#FFFAF0] to-[#F0F5FF]">
      <ProblemsTableHeader/>
      <ProblemsTableRow/>
    </div>
  )
}

function ProblemsTableHeader() {
  return (
    <div className="grid grid-cols-5 py-5 text-[#236A00] font-semibold">
      <div className="px-10 text-center">풀이 상태</div>
      <div className="px-10 text-center">문제 제목</div>
      <div className="px-10 text-center">난이도</div>
      <div className="px-10 text-center">완료한 사람</div>
      <div className="px-10 text-center">정답률</div>
    </div>
  );
}

function ProblemsTableRow() {
  return (
    <div className="grid grid-cols-5 text-center py-5">
      <div className="flex justify-center items-center">
        <ProblemStatus/>
      </div>
      <div className="px-10 flex justify-center items-center">Two sum</div>
      <div className="px-10 flex justify-center items-center">Lv.1</div>
      <div className="px-10 flex justify-center items-center">0명</div>
      <div className="px-10 flex justify-center items-center">0%</div>
    </div>
  );
}

function ProblemStatus() {
  return (
    <div className="flex-1 flex justify-center">
      <span className="inline-block rounded-2xl bg-[#FFF0F0] text-[#0047D4] py-2 px-3">
        풀이 완료
      </span>
    </div>
  )
}