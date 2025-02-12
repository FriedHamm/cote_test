'use client'
import { useState } from 'react';
import Pagination from "rc-pagination";

export default function PaginationWrapper({}) {
  // 현재 페이지 상태를 저장합니다.
  const [current, setCurrent] = useState(1);

  // 페이지가 변경될 때 호출되는 onChange 핸들러
  const handlePageChange = (page) => {
    console.log("현재 페이지:", page);
    setCurrent(page);
  };

  return (
    <div className="flex justify-center">
      <Pagination
        className="flex"
        current={current}
        pageSize={10}
        total={989}
        onChange={handlePageChange}
        itemRender={(page, type, element) => {
          if (type === 'page') {
            return (
              <button className={`px-4 py-2 rounded hover:bg-blue-500
              ${current === page ? 'bg-blue-600' : ''}`}>
                {page}
              </button>
            );
          }
          if (type === 'prev') {
            return (
              <button className="px-4 py-2 rounded hover:bg-blue-500">
                이전
              </button>
            );
          }
          if (type === 'next') {
            return (
              <button className="px-4 py-2 rounded hover:bg-blue-500">
                다음
              </button>
            );
          }

          return element;
        }}
      />
    </div>
  );
}