import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 백엔드 API를 호출해 로그인 상태를 확인하는 thunk
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/v1/user`);
    return response.data.msg;
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