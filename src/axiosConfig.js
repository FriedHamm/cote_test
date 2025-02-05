import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response,
  error => {
    // 에러가 발생했을 때 에러 객체를 먼저 로그로 확인
    console.log('API 에러:', error);
    console.log('에러 응답 데이터:', error?.response?.data);

    // 에러 응답이 있고, status가 401이면
    if (error?.response?.status === 401) {
      const errorMessage = error?.response?.data?.message || '';

      if (errorMessage === 'access token required.') {
        // 기존 요청: access token required 상황일 때 토큰 리프레시 요청
        api.post('account/v1/auth/social/token/refreshment')
          .then(() => {
            console.log('토큰 리프레시 요청이 성공했습니다.');
          })
          .catch(err => {
            console.log('토큰 리프레시 요청에 실패했습니다.', err);
          });
      } else if (errorMessage === 'refresh token required.') {
        // TODO: refresh token required 상황에 대한 조건 추가 (추후 로직 구현)
        console.log('리프레시 토큰이 필요합니다.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;