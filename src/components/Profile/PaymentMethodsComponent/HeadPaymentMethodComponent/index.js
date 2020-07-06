import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Platform} from 'react-native';
import {ETASimpleText} from '@etaui';

const logoSize = 110;
const avatarRadius = logoSize / 2;

const Root = styled.View`
  flex: 0.2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  background-color: transparent;
`;
const ContentContainer = styled.View`
  min-height: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 10px 20px;
`;
const LogoContainer = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: ${avatarRadius}px;
  background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
  border-width: 0.3px;
  border-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const Logo = styled.Image`
  height: ${Platform.OS === 'ios' ? logoSize : 70}px;
  width: ${Platform.OS === 'ios' ? logoSize : 70}px;
  border-radius: 45px;
`;

const HeadPaymentMethodComponent = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <LogoContainer>
        <Logo
          source={{
            uri:
              'https://img.pngio.com/atm-card-png-transparent-atm-cardpng-images-pluspng-debit-card-png-250_250.png',
          }}
        />
      </LogoContainer>
      <ContentContainer>
        <ETASimpleText
          size={10}
          weight={Platform.OS === 'ios' ? '300' : '200'}
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          align={'left'}>
          Here you can find your payment methods to products
        </ETASimpleText>
      </ContentContainer>
    </Root>
  );
};

export default React.memo(HeadPaymentMethodComponent);
