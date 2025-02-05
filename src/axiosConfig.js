import axios from 'axios';
import {store} from "@/store/store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response,
  error => {
    console.log('API 에러:', error);
    console.log('에러 응답 데이터:', error?.response?.data);

    // 에러 응답이 있고, status가 401이면
    if (error?.response?.status === 401) {
      // Redux 스토어에서 로그인 상태 확인
      const state = store.getState();
      const isLoggedIn = state.auth?.isLoggedIn; // 로그인 상태가 저장된 필드 이름에 맞게 수정

      // 로그인 상태가 아니라면 토큰 재발급 요청을 건너뜁니다.
      if (!isLoggedIn) {
        console.log('로그인 상태가 아닙니다. 토큰 재발급 요청을 하지 않습니다.');
        return Promise.reject(error);
      }

      const errorMessage = error?.response?.data?.detail || '';

      if (errorMessage === 'access token required.') {
        // access token이 필요한 경우, 토큰 재발급 요청
        api.post('account/v1/auth/social/token/refreshment')
          .then(() => {
            console.log('토큰 리프레시 요청이 성공했습니다.');
          })
          .catch(err => {
            console.log('토큰 리프레시 요청에 실패했습니다.', err);
          });
      } else if (errorMessage === 'refresh token required.') {
        // refresh token이 필요한 경우 추가 로직 (조건문만 추가)
        console.log('로그아웃합니다.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;