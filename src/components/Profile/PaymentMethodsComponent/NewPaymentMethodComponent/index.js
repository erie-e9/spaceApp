import React from 'react';
import styled from 'styled-components/native';
import {ETACreditCard} from '@etaui';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems: center;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  paddingVertical: 10px;
`;

const NewPaymentMethodComponent = () => {
  
  return (
    <Root>
      <ETACreditCard lang='en'/>
    </Root>
  );
};

export default NewPaymentMethodComponent;