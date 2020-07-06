import React from 'react';
import styled from 'styled-components/native';
import ProfileComponent from '@components/Profile/ProfileComponent';

const Root = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const ProfileScreen = () => {
  return (
    <Root>
      <ProfileComponent />
    </Root>
  );
};

export default ProfileScreen;
