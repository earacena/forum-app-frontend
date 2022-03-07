import React from 'react';
import styled from 'styled-components';
import store from '../../app/store';
import { useAppSelector } from '../../hooks';
import {
  removeNotificationMessage,
  setNotificationMessage,
} from './notification.slice';

interface NotificationWrapperProps {
  readonly error?: boolean;
}

const NotificationWrapper = styled.div<NotificationWrapperProps>`
  background: ${(props) => (props.error ? 'hsl(0,65.2%,81.3%)' : 'hsl(112.2, 65.2%, 81.3%)')};
  text-align: center;
  border-radius: 4px;
  margin: 1em;
  margin-left: 10em;
  margin-right: 10em;
  padding: 1em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4)
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
