import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FavsScreen = () => {

  return (
    <Root>
      <ETASimpleText
        size={14}
        weight={Platform.OS === 'ios' ? '700' : '600'}
        align={'left'}>
        Favorites
      </ETASimpleText>
    </Root>
  );
};

export default FavsScreen;
