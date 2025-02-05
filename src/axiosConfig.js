import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response,
  error => {
    // 에러 응답이 있고, status가 401이면
    if (error.response && error.response.status === 401) {
      api.post('account/v1/auth/social/token/refreshment')
        .then(() => {
          console.log('토큰 리프레시 요청이 성공했습니다.');
        })
        .catch(err => {
          console.log('토큰 리프레시 요청에 실패했습니다.', err);
        });
    }
    return Promise.reject(error);
  }
);

export default api;