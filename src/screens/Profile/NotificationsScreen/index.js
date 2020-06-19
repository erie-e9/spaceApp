import React from 'react';
import styled from 'styled-components/native';
import NotificationsComponent from '@components/Profile/NotificationsComponent';

const Root = styled.View`
  flex: 1;
`;

const NotificationsScreen = () => {
  return (
    <Root>
      <NotificationsComponent />
    </Root>
  );
};

export default NotificationsScreen;
