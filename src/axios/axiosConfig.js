import axios from 'axios';
import {handleLogout} from "@/authHelper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    console.log('API 에러:', error);
    if (error?.response?.status === 401) {
      const originalRequest = error.config; // Save the original request config
      const errorMessage = error?.response?.data?.detail || '';
      console.error(errorMessage);
      if (errorMessage === 'access token required.' && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loop
        try {
          await api.post('account/v1/auth/token/refreshment');
          console.log('토큰 리프레시 요청이 성공했습니다.');
          return api(originalRequest); // Retry the original request after token refreshment
        } catch (err) {
          console.log('토큰 리프레시 요청에 실패했습니다.', err);
          handleLogout();
        }
      } else if (errorMessage === 'refresh token required.') {
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;