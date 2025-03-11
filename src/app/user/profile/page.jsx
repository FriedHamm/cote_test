'use client'
import {useSelector} from "react-redux";
import {useState} from "react";
import PasswordResetModal from "@/app/user/PasswordResetModal";


export default function ProfilePage() {
  const email = useSelector((state) => state.auth.email);
  const [passwordResetModalOpen,setPasswordResetModalOpen] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PasswordResetModal open={passwordResetModalOpen} setOpen={setPasswordResetModalOpen}/>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">계정 관리</h3>
      </div>
      <div className="mt-6 border-t border-gray-100 divide-y divide-gray-200">
        <dl>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
          </div>
        </dl>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <h4 className="text-sm/6 font-medium text-gray-900">비밀번호 변경</h4>
          <button
            type="button"
            onClick={() => setPasswordResetModalOpen(!passwordResetModalOpen)}
            className="mt-1 sm:mt-0 sm:col-start-2 justify-self-start rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            비밀번호 변경하기
          </button>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <h4 className="text-sm/6 font-medium text-gray-900">계정 탈퇴</h4>
          <p className="mt-1 text-sm/6 text-gray-700 sm:mt-0">계정 탈퇴 시 프로필 및 응시한 테스트 정보가 삭제 됩니다.</p>
          <button
            type="button"
            className="mt-1 sm:mt-0 sm:col-start-3 justify-self-start rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            계정 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  )
}
