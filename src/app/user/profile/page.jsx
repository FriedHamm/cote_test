'use client'
import { useEffect, useState } from "react";
import api from "@/axios/axiosConfig";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newProfileImg, setNewProfileImg] = useState('');

  const email = useSelector((state) => state.auth.email);
  const router = useRouter();
  const dispatch = useDispatch();

  // 회원 탈퇴 API
  const onClick = async () => {
    try {
      const response = await api.delete('account/v1/user');
      console.log(response);
      dispatch(logout());
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  // /user 경로로 PATCH 요청 (회원 정보 업데이트)
  const updateUser = async (data) => {
    try {
      const response = await api.patch('account/v1/user', data);
      console.log('User updated:', response.data);
      alert('회원 정보 업데이트 성공');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || '회원 정보 업데이트 중 오류 발생');
    }
  };

  // /user/profile 경로로 PATCH 요청 (프로필 업데이트)
  const updateUserProfile = async (data) => {
    try {
      const response = await api.patch('account/v1/user/profile', data);
      console.log('User profile updated:', response.data);
      alert('프로필 업데이트 성공');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || '프로필 업데이트 중 오류 발생');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('account/v1/user/profile');
        setUserName(response.data.username);
      } catch (error) {
        console.log(error);
        if (error.response.status !== 401) {
          alert('에러가 발생했습니다. 다시 시도해주세요.');
        }
        router.push('/');
      }
    };
    fetchData();
  }, [router]);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">계정 관리</h2>

      <div>
        <h3 className="text-lg font-bold">기본 정보</h3>
        <div className="border rounded-lg bg-[#FFF0F0] p-4">
          <div>{`Email: ${email}`}</div>
          <div>{`Username: ${userName}`}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold">회원 탈퇴</h3>
        <div className="border rounded-lg bg-[#FFF0F0] p-4">
          <button onClick={onClick} className="text-red-600">
            탈퇴하기
          </button>
        </div>
      </div>

      {/* 회원 정보 업데이트 섹션 */}
      <div>
        <h3 className="text-lg font-bold">회원 정보 업데이트</h3>
        <div className="border rounded-lg bg-[#F0FFF0] p-4 flex flex-col gap-2">
          <label>
            Email:
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="새 이메일"
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <button
            onClick={() => updateUser({ email: newEmail, password: newPassword })}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            회원 정보 업데이트
          </button>
        </div>
      </div>

      {/* 프로필 업데이트 섹션 */}
      <div>
        <h3 className="text-lg font-bold">프로필 업데이트</h3>
        <div className="border rounded-lg bg-[#F0F0FF] p-4 flex flex-col gap-2">
          <label>
            Username:
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="새 username"
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <label>
            Profile Image URL:
            <input
              type="text"
              value={newProfileImg}
              onChange={(e) => setNewProfileImg(e.target.value)}
              placeholder="프로필 이미지 URL"
              className="border rounded px-2 py-1 ml-2"
            />
          </label>
          <button
            onClick={() =>
              updateUserProfile({
                username: newUsername,
                profile_img: newProfileImg,
              })
            }
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            프로필 업데이트
          </button>
        </div>
      </div>
    </div>
  );
}