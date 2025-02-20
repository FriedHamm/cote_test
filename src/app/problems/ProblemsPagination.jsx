'use client'
import {usePathname, useRouter} from "next/navigation";
import PaginationWrapper from "@/components/Pagination";

export default function ProblemsPagination() {
  const currentPage = +usePathname().split('/')[2];
  const router = useRouter();

  const handlePageChange = (page) => {
    console.log("현재 페이지:", page);
    router.push(`/problems/${page}`)
  };

  return (
    <PaginationWrapper current={currentPage} onPageChange={handlePageChange} />
  )
}