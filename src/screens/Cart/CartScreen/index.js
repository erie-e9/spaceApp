import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const CartScreen = () => {
  return (
    <Root>
      <ETASimpleText
        size={14}
        weight={Platform.OS === 'ios' ? '700' : '600'}
        align={'left'}>
        Cart
      </ETASimpleText>
    </Root>
  );
};

export default CartScreen;
