import PaginationWrapper from "@/components/Pagination";

export default function ProblemsPagination({curPage, totalCount = 10}) {

  return (
    <PaginationWrapper curPage={+curPage} totalCount={totalCount}/>
  )
}