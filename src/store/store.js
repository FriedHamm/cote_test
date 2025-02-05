import { configureStore } from '@reduxjs/toolkit';
import problemReducer from'./slices/problemSlice';

export const store = configureStore({
  reducer: {
    problem: problemReducer,
    // 다른 슬라이스들 ...
  },
});