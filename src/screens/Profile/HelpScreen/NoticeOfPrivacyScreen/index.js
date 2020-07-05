import React from 'react';
import styled from 'styled-components/native';
import NoticeOfPrivacyComponent from '@components/Profile/HelpComponent/NoticeOfPrivacyComponent';

const Root = styled.View`
  flex: 1;
`;

const NoticeOfPrivacyScreen = () => {
  return (
    <Root>
      <NoticeOfPrivacyComponent />
    </Root>
  );
};

export default NoticeOfPrivacyScreen;
