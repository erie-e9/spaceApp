import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
  align-items: center;
  justify-content: center;
`;

const ETAHeaderText = ({children, size, weight, color, align}) => (
  <Text
    style={{
      textAlign: align ? align : 'left',
      color: color ? color : 'black',
      fontWeight: weight ? weight : '500',
      fontSize: size ? size : 26,
    }}>
    {children ? children : 'Text'}
  </Text>
);

export default ETAHeaderText;
