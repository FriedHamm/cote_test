import { createSlice } from '@reduxjs/toolkit';

// alert에 대한 고유 id 생성용 변수
let nextAlertId = 0;

const initialState = {
  alerts: [] // 각 alert는 { id, type, message, show } 형태로 관리
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    // 새 alert를 추가
    addAlert: (state, action) => {
      const { type, message } = action.payload;
      state.alerts.push({
        id: nextAlertId++,
        type,          // 예: 'warning', 'error', 'info' 등
        message,       // alert에 표시할 메시지
        show: true,    // 기본적으로 alert는 보이는 상태
      });
    },
    // 특정 alert의 show 상태를 true로 전환. 이건 어떤 경우에 사용하게 될지는 모름
    showAlert: (state, action) => {
      const alert = state.alerts.find(alert => alert.id === action.payload);
      if (alert) {
        alert.show = true;
      }
    },
    // 특정 alert의 show 상태를 false로 전환. 닫기 버튼이 존재할 경우에 사용할 것
    hideAlert: (state, action) => {
      const alert = state.alerts.find(alert => alert.id === action.payload);
      if (alert) {
        alert.show = false;
      }
    },
    // 특정 alert를 상태에서 제거
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
  },
});

export const { addAlert, showAlert, hideAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;