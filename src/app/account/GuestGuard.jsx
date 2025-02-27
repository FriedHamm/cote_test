'use client'

import useGuest from "@/app/hooks/useGuest";
import Spinner from "@/components/Spinner";

export default function GuestGuard({children}) {
  const {guestChecked, status, isLoggedIn } = useGuest();

  if (status === 'idle' || status === 'loading' || !guestChecked) {
    return <Spinner />;
  }
  return children;
}

// 생각해야 할건.. 로드시 그때는 바로 확인하면 로그인이 안되어있는 것처럼 표시됨
// 그렇다고 뚫리면 안되겠지? 그래서 loading이거나 idle 이면 스피너?
// 만약에 끝났는데 로그인이 되어있다? 그러면 뭐.. 잘못된 요청입니다. 라고 띄운 다음에 홈으로 라우