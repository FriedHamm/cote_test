import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/axios/axiosConfig";

// 백엔드 API를 호출해 로그인 상태를 확인하는 thunk
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await api.get('/account/v1/user/validation');

    // validation이 성공(true)이면 추가 요청을 보냄
    if (response.data.status === true) {
      const userResponse = await api.get('/account/v1/user');
      console.log(userResponse.data); // 결과값 로그
    }

    return response.data.status;
  }
);

const initialState = {
  isLoggedIn: false,
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