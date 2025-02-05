import { configureStore } from '@reduxjs/toolkit';
import problemReducer from'./slices/problemSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    problem: problemReducer,
    auth: authReducer
    // 다른 슬라이스들 ...
  },
});