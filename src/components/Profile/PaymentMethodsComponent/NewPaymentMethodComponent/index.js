import React from 'react';
import styled from 'styled-components/native';
import {ETACreditCard} from '@etaui';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  padding-vertical: 10px;
`;

const NewPaymentMethodComponent = () => {
  
  return (
    <Root>
      <ETACreditCard lang='en'/>
    </Root>
  );
};

export default NewPaymentMethodComponent;