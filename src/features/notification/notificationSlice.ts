import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  message: '',
  timeoutId: undefined,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const { type, message, newTimeoutId } = action.payload;
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
