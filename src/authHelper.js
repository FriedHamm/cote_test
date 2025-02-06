import {logout} from "@/store/slices/authSlice";
import {store} from "@/store/store";

export function handleLogout() {
  store.dispatch(logout());

  // 메인 페이지(혹은 로그인 페이지)로 리다이렉트
  alert('로그아웃 되었습니다.')
  window.location.href = '/';
}