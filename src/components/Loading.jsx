import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        {/* 회전하는 스피너 */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* 로딩 중 텍스트 */}
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}