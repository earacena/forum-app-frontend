import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const { type, message } = action.payload;
      return { type, message };
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
