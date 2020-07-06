import React from 'react';
import styled from 'styled-components/native';
import HeadPaymentMethodComponent from './HeadPaymentMethodComponent';
import SubHeadPaymentMethodComponent from './SubHeadPaymentMethodComponent';
import PaymentMethodsListComponent from './PaymentMethodsListComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const PaymentMetodComponent = () => {
  return (
    <Root>
      <HeadPaymentMethodComponent />
      <SubHeadPaymentMethodComponent />
      <PaymentMethodsListComponent />
    </Root>
  );
}

export default PaymentMetodComponent;
