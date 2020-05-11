import React from 'react';
import styled from 'styled-components/native';
import ProfileContent from '@components/ProfileContent';

const Root = styled.View`
  flex: 1;
`;
const Spacevertical = styled.View`
  marginTop: 50px;
`;
const Scroller = styled.ScrollView``;

const ProfileScreen = () => {
  return (
    <Root>
      <Scroller>
        <Spacevertical>
          <ProfileContent />
        </Spacevertical>
      </Scroller>
    </Root>
  );
};

export default ProfileScreen;
