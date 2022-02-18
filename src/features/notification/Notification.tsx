import React from 'react';
import styled from 'styled-components';
import store from '../../app/store';
import { useAppSelector } from '../../hooks';
import {
  removeNotificationMessage,
  setNotificationMessage,
} from './notificationSlice';

interface NotificationWrapperProps {
  readonly error?: boolean;
}

const NotificationWrapper = styled.div<NotificationWrapperProps>`
  background: lightgrey;
  border: 2px ${(props) => (props.error ? 'red' : 'green')} solid;
  border-radius: 4px;
  margin-left: 10em;
  margin-right: 10em;
  padding: 0.8em;
`;

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  if (message === '') {
    return null;
  }
  return (
    <NotificationWrapper error={type === 'error'}>
      {message}
    </NotificationWrapper>
  );
}

export const notify = (
  type: string,
  message: string,
  durationInSeconds: number,
) => {
  const { dispatch } = store;
  const newTimeoutId = setTimeout(() => {
    dispatch(removeNotificationMessage());
  }, durationInSeconds * 1000);
  dispatch(setNotificationMessage({ type, message, newTimeoutId }));
};

export default Notification;
