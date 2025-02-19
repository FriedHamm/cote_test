'use client'
import {useEffect, useState} from "react";
import api from "@/axios/axiosConfig";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {logout} from "@/store/slices/authSlice";

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      const response = await api.delete('account/v1/user');
      console.log(response);
      dispatch(logout());
      router.push('/');
    } catch (error) {
      alert(error);
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('account/v1/user/profile');
        console.log(response);
        setUserName(response.data.username);
      } catch (error) {
        console.log(error);
        alert(`에러가 발생하였습니다. 다시 시도해주세요. ${error}`);
        router.push('/');
      }

    }
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">계정 관리</h2>
      <div>
        <h3 className="text-lg font-bold">기본 정보</h3>
        <div className="border rounded-lg bg-[#FFF0F0]">
          {userName}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">회원 탈퇴</h3>
        <div className="border rounded-lg bg-[#FFF0F0]">
          <button onClick={onClick}>탈퇴하기</button>
        </div>
      </div>
    </div>
  )
}