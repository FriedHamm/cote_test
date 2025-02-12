import axios from 'axios';
import {handleLogout} from "@/authHelper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    // 에러가 발생했을 때 에러 객체를 먼저 로그로 확인
    console.log('API 에러:', error);

    // 에러 응답이 있고, status가 401이면
    if (error?.response?.status === 401) {
      const errorMessage = error?.response?.data?.detail || '';
      console.error(errorMessage);

      if (errorMessage === 'access token required.') {
        try {
          await api.post('account/v1/auth/token/refreshment');
          console.log('토큰 리프레시 요청이 성공했습니다.'); // 엑세스 토큰 재발급의 경우에는 이미 로그인이 된 상태이므로, 상태를 건드릴 필요는 없음
        } catch (err) {
          console.log('토큰 리프레시 요청에 실패했습니다.', err); // 이 경우에는 바로 로그아웃 처리를 해야할듯
          handleLogout(); // 강제 로그아웃 시켜버림.. 일단 이렇게 처리하도록 하겠음
        }
      } else if (errorMessage === 'refresh token required.') {
        handleLogout();
        // 이 경우는 엑세스 토큰이 필요한 요청을 했는데 401이 넘어왔고 재발급 받으려 했는데 리프레시가 없는 경우임. 강제 로그아웃.
      }
    }
    return Promise.reject(error);
  }
);

export default api;