'use client'

import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export default function AdminLayout({ children }){
  const {isLoggedIn, role} = useSelector(state => state.auth);
  const router = useRouter();

  if (!isLoggedIn || role !== 'A') {
    alert('권한이 없습니다.')
    router.push('/');
  }

  return (
    <div>

    </div>
  )

}