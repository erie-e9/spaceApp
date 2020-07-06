import React from 'react';
import styled from 'styled-components/native';
import NewPaymentMethodComponent from '@components/Profile/PaymentMethodsComponent/NewPaymentMethodComponent';

const Root = styled.View`
  flex: 1;
`;

const NewPaymentMethodScreen = () => {
  return (
    <Root>
      <NewPaymentMethodComponent />
    </Root>
  );
};

export default NewPaymentMethodScreen;
