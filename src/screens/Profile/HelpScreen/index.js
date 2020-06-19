import React from 'react';
import styled from 'styled-components/native';
import HelpComponent from '@components/Help/HelpComponent';

const Root = styled.View`
  flex: 1;
`;

const HelpScreen = () => {
  return (
    <Root>
      <HelpComponent />
    </Root>
  );
};

export default HelpScreen;
