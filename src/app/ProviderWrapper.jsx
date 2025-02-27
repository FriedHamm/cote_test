'use client';

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from '@/store/store'
import { useEffect } from "react";
import { checkAuth, clearLogoutRequest } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { addAlert } from "@/store/slices/alertSlice";
import useTrackPreviousUrl from "@/app/hooks/useTackPreviousUrl";

export default function ProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      <TrackUrlWrapper>
        {children}
        <LoginChecker />
        <LogoutWatcher />
      </TrackUrlWrapper>
    </Provider>
  );
}

function TrackUrlWrapper({ children }) {
  // 이제 Provider 내부에서 호출되므로 Redux 훅 사용이 안전합니다.
  useTrackPreviousUrl();
  return <>{children}</>;
}

function LoginChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return null;
}

function LogoutWatcher() {
  const { logoutRequest, logoutMessage } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (logoutRequest) {
      dispatch(
        addAlert({
          type: "info",
          message: logoutMessage,
          link: { title: "로그인", href: "/account/sign-in" },
        })
      );
      router.push("/");
      dispatch(clearLogoutRequest());
    }
  }, [logoutRequest, router, dispatch]);

  return null;
}