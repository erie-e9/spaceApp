import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import GetOnePaymentMethodComponent from '@components/Profile/PaymentMethodsComponent/GetOnePaymentMethodComponent';

const Root = styled.View`
  flex: 1;
`;

const GetOnePaymentMethodScreen = ({ navigation, route }) => {
  const { item } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: item.details});
  }, [ navigation, route ]);

  return (
    <Root>
      <GetOnePaymentMethodComponent />
    </Root>
  );
};

export default GetOnePaymentMethodScreen;
