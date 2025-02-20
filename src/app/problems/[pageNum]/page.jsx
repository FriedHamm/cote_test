import ProblemsTable from "@/app/problems/ProblemsTable";
import ProblemsPagination from "@/app/problems/ProblemsPagination";

async function fetchProblemsList() {
  // 여기서 데이터 페칭
}

export default function Problems({params, searchParams}) {

  return (
    <div className="min-h-screen pt-24 pb-6 bg-[#FFFAF0] flex flex-col gap-4">
      <ProblemsTable/>
      <ProblemsPagination/>
    </div>

  )
}
