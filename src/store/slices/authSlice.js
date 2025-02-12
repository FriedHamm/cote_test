import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/axios/axiosConfig";

// 백엔드 API를 호출해 로그인 상태를 확인하는 thunk
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await api.get('/account/v1/user/validation');

    // 로그인 되어있다면 회원 정보를 받아옴
    if (response.data.status === true) {
      const userResponse = await api.get('/account/v1/user');
      console.log(userResponse.data); // 지금은 단순히 log지만, 권한 정보를 저장해야 함. 그런 후 payload에 status와 함께 담아야 함.
    }

    // 현재 에러처리가 안되어 있는데.. api 명세 에러가 저게 전부인지 확인해야 함
    return response.data.status;
  }
);

const initialState = {
  isLoggedIn: false,
  role: '', // 어떤 권한이 있는지 몰라서 일단 공란으로 둠
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;