import React from 'react';
import styled from 'styled-components/native';
import PaymentMethodsComponent from '@components/Profile/PaymentMethodsComponent';

const Root = styled.View`
  flex: 1;
`;

const PaymentMethodsScreen = () => {
  return (
    <Root>
      <PaymentMethodsComponent />
    </Root>
  );
};

export default PaymentMethodsScreen;
