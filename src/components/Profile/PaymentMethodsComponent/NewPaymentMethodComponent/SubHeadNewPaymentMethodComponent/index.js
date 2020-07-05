import React, {useEffect, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useRoute} from '@react-navigation/native';
import {ETASimpleText, ETAButtonOutline, ETAButtonFilled} from '@etaui';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems: center;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  paddingVertical: 10px;
`;

const SubHeadNewPaymentMethodComponent = () => {
  
  return (
    <Root>
      
    </Root>
  );
};

export default SubHeadNewPaymentMethodComponent;