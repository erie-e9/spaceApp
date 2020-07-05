import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, AntDesign, Feather, SimpleLineIcons} from '@icons';
import {Context} from '@context';
import {ETASimpleText} from '@etaui';
import HeadGetOnePaymentMethodComponent from './HeadGetOnePaymentMethodComponent';
import SubHeadGetOnePaymentMethodComponent from './SubHeadGetOnePaymentMethodComponent';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  backgroundColor: transparent;
`;

const GetOnePaymentMethodComponent = () => {

  return (
    <Root>
      {/* <HeadGetOnePaymentMethodComponent /> */}
      <SubHeadGetOnePaymentMethodComponent />
    </Root>
  );
}

export default GetOnePaymentMethodComponent;
