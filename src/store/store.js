import { configureStore } from '@reduxjs/toolkit';
import problemReducer from'./slices/problemSlice';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import previousUrlReducer from './slices/previousUrlSlice';


export const store = configureStore({
  reducer: {
    problem: problemReducer,
    auth: authReducer,
    alerts: alertReducer,
    previousUrl: previousUrlReducer
    // 다른 슬라이스들 ...
  },
  devTools: process.env.NODE_ENV !== 'production'
});