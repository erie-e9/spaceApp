import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const T = styled.Text``;

const AnalyticsScreen = () => {
  return (
    <Root>
      <T>Analytics</T>
    </Root>
  );
};

export default AnalyticsScreen;
