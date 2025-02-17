import { logout } from "@/store/slices/authSlice";
import { store } from "@/store/store";

export function handleLogout() {
  // 이미 로그아웃 상태라면 실행하지 않음
  if (!store.getState().auth.isLoggedIn) {
    return;
  }

  store.dispatch(logout());
  alert('로그아웃 되었습니다.');
  window.location.href = '/';
}