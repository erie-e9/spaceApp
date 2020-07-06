import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
  align-items: center;
  justify-content: center;
`;

const ETASimpleText = ({
  children,
  size,
  weight,
  color,
  align,
  onPress,
  style,
}) => {
  return (
    <Text
      onPress={onPress ? onPress : null}
      style={{
        textAlign: align ? align : 'center',
        color: color ? color : 'black',
        fontWeight: weight ? weight : '500',
        fontSize: size ? size : 14,
        ...style,
      }}>
      {children ? children : 'Text'}
    </Text>
  );
};

export default ETASimpleText;
