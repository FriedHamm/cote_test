'use client'
import Pagination from "rc-pagination";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

export default function PaginationWrapper({current, total, onPageChange: handlePageChange}) {

  // 페이지가 변경될 때 호출되는 onChange 핸들러
  console.log(current);

  return (
    <nav aria-label="Pagination" className="isolate mx-auto">
      <Pagination
        className="flex -space-x-px rounded-md shadow-sm"
        current={current}
        pageSize={10}
        total={989}
        onChange={handlePageChange}
        itemRender={(page, type, element) => {
          if (type === 'page') {
            // 공통 클래스
            const baseClass =
              "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20";
            // 현재 페이지일 때 추가 클래스
            const activeClass =
              "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
            // 기본 페이지일 때 추가 클래스
            const inactiveClass =
              "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";

            const buttonClass = current === page ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;

            return (
              <button aria-current={current === page ? 'page' : undefined} className={buttonClass}>
                {page}
              </button>
            );
          }
          if (type === 'prev') {
            return (
              <button
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden={true} className="size-5"/>
              </button>
            );
          }
          if (type === 'next') {
            return (
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className=" sr-only">Next</span>
                <ChevronRightIcon aria-hidden=" true" className=" size-5" />
              </button>
            );
          }

          return element;
        }}
      />
    </nav>
  );
}