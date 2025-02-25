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
      console.log(error)
      const originalRequest = error.config;
      const errorMessage = error?.response?.data?.detail || '';
      if (errorMessage === 'access token required.' && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await api.post('account/v1/auth/token/refreshment');
          return api(originalRequest);
        } catch (err) {
          const { logoutRequest } = store.getState().auth;
          if (!logoutRequest) {
            store.dispatch(logout(logoutMessage));
          }
        }
      } else if (errorMessage === 'refresh token required.') {
        const { logoutRequest } = store.getState().auth;
        if (!logoutRequest) {
          store.dispatch(logout(logoutMessage));
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;