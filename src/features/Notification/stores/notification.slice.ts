import { createSlice } from '@reduxjs/toolkit';

type NotificationState = {
  type: string,
  message: string,
  timeoutId: number | undefined,
};

const initialState: NotificationState = {
  type: '',
  message: '',
  timeoutId: undefined,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const { type, message, newTimeoutId } = action.payload.notification;
      clearTimeout(state.timeoutId);
      return { type, message, timeoutId: newTimeoutId };
    },
    removeNotificationMessage() {
      return initialState;
    },
  },
});

export const {
  setNotificationMessage,
  removeNotificationMessage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
