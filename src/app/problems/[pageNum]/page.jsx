import ProblemsTable from "@/app/problems/ProblemsTable";
import ProblemsPagination from "@/app/problems/ProblemsPagination";
import api from "@/axios/axiosConfig";
import ErrorGuard from "@/components/ErrorGuard";

async function fetchProblemsList(pageNum) {
  try {
    const response = await api.get(`cote/v1/problems?page=${pageNum}&size=10&fields=problem`);
    return { problemList: response.data, totalCount: response.headers['X-Total-Count'] };
  } catch (error) {
    if (error.response || error.request) {
      throw new Error(`문제 리스트를 가져오는데 문제가 발생했습니다. ${error.status}`);
    } else {
      throw error;
    }
  }
}

export default async function Problems({params, searchParams}) {
  const { pageNum } = await params;
  let problemList = null;
  let errorMessage = [];

  try {
    problemList = await fetchProblemsList(pageNum);
  } catch (error) {
    errorMessage.push(error.message);
  }


  if (errorMessage) {
    return <ErrorGuard errorMessage={errorMessage} redirectUrl="/"/>;
  }

  return (
    <div className="min-h-screen pt-24 pb-6 bg-[#FFFAF0] flex flex-col gap-4">
      <ProblemsTable problemList={problemList?.problemList} />
      <ProblemsPagination totalCount={problemList?.totalCount} curPage={pageNum}/>
    </div>

  )
}
