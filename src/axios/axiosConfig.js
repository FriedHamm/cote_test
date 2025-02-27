import axios from 'axios';
import { store } from '@/store/store';
import { logout } from "@/store/slices/authSlice";

const logoutMessage = '로그아웃 되었습니다. 계속하시려면 다시 로그인해주세요.';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      const originalRequest = error.config;
      const errorMessage = error?.response?.data?.detail || '';

      if (errorMessage === 'access token required.' && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // 엑세스 토큰 재발급 때 에러 처리는 지금 일단 하진 않음.. 해야하나.. 
          await api.post('account/v1/auth/token/refreshment');
          return api(originalRequest);
        } catch (err) {
          // 여기는 axios refresh 시도가 실패한 경우
          if (!originalRequest.headers['X-User-Logout']) {
            const { logoutRequest } = store.getState().auth;
            if (!logoutRequest) {
              store.dispatch(logout({ logoutRequest: true, logoutMessage }));
            }
          }
        }
      } else if (errorMessage === 'refresh token required.') {
        // refresh token이 요청에 없을 때 (이미 로그아웃 등)
        if (!originalRequest.headers['X-User-Logout']) {
          const { logoutRequest } = store.getState().auth;
          if (!logoutRequest) {
            store.dispatch(logout({ logoutRequest: true, logoutMessage }));
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;