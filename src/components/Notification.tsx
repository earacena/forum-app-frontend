import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks';

const NotificationWrapper = styled.div<NotificationWrapperProps>`
  background: lightgrey;
  border: 1px green solid;
  border-radius: 4px;
  margin-left: 10em;
  margin-right: 10em;
  padding: 0.8em;
`;

interface NotificationWrapperProps {
  readonly error?: boolean;
}

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  return (
    <NotificationWrapper error={type === 'error'}>
      {message}
    </NotificationWrapper>
  );
}

export default Notification;
