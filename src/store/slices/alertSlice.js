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
      const { type, message, link } = action.payload;
      state.alerts.push({
        id: nextAlertId++,
        type,          // 예: 'warning', 'error', 'info' 등
        message,       // alert에 표시할 메시지
        link,          // 간혹 Alert에 링크를 포함하는 경우가 있을 거임.. undefined일 수 있음
        show: true,    // 기본적으로 alert는 보이는 상태
      });
    },
    // 특정 alert를 상태에서 제거
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;