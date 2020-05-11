import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const Loading = ({color, size = 'large'}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <ActivityIndicator
        size={size}
        color={color ? color : themeContext.PRIMARY_COLOR}
      />
    </Root>
  );
};

export default Loading;
