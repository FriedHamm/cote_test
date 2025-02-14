import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/axios/axiosConfig";

// 백엔드 API를 호출해 로그인 상태를 확인하는 thunk
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/account/v1/user/validation');
      if (response.data.status === true) {
        const userResponse = await api.get('/account/v1/user');
        // 로그인이 되어있으면 사용자 정보 반환
        return {
          isLoggedIn: true,
          role: userResponse.data.userrole,
          email: userResponse.data.email,
        };
      } else {
        // 로그인이 되어있지 않으면 기본값 반환
        return {
          isLoggedIn: false,
          role: '',
          email: '',
        };
      }
    } catch (error) {
      // 에러 발생 시, 에러 정보를 rejectWithValue를 통해 전달
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  role: '', // 'U': 일반 사용자 | 'A': 관리자 | 'S': 슈퍼유저
  email: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = '';
      state.email = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = action.payload.isLoggedIn;
        state.role = action.payload.role;
        state.email = action.payload.email;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;