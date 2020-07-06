import React, {useEffect, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useRoute} from '@react-navigation/native';
import {ETASimpleText, ETAButtonOutline, ETAButtonFilled} from '@etaui';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  padding-vertical: 10px;
`;

const HeadNewPaymentMethodComponent = () => {
  
  return (
    <Root>
      
    </Root>
  );
};

export default HeadNewPaymentMethodComponent;