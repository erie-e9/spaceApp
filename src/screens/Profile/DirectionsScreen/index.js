import React from 'react';
import styled from 'styled-components/native';
import DirectionsComponent from '@components/Profile/DirectionsComponent';

const Root = styled.View`
  flex: 1;
`;

const DirectionsScreen = () => {
  return (
    <Root>
      <DirectionsComponent />
    </Root>
  );
};

export default DirectionsScreen;
