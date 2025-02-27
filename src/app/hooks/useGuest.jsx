import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {addAlert} from "@/store/slices/alertSlice";
import {clearLoginRequest} from "@/store/slices/authSlice";

export default function useGuest() {
  const {status, isLoggedIn, loginRequest} = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [guestChecked, setGuestChecked] = useState(false);

  useEffect(() => {
    if (status === 'idle' || status === 'loading') return;

    if (isLoggedIn && !loginRequest) {
      dispatch(addAlert(
        {
          type: 'warning',
          message: '잘못된 접근입니다.'
        }
      ))
      router.push('/')
    } else {
      setGuestChecked(true);
    }

    return () => {
      dispatch(clearLoginRequest());
    };
  }, [isLoggedIn, status, router, dispatch]);

  return {guestChecked, status, isLoggedIn};
}

// 초기 로드 시에는 무조건 loginRequest가 false임
// 그 상태에서 로그인 되면 isLoggedin이면서 로그인 요청을 넣지 않았으니 디스패치 후 라우팅이 됨
// 반면 로그인을 직접 요청한 경우.. 이 경우에는 isLoggedIn이 true가 되면서 로그인 요청은 true기 때문에 잘못된 접근 처리가 안됨..