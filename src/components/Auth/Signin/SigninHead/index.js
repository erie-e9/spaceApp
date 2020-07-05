import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import { variables } from '@utils/constants';

const logoSize = 110;
const avatarRadius = logoSize / 2;

const Root = styled.View`
  flex: 0.3;
  justifyContent: center;
  alignItems: center;
`;
const LogoContainer = styled.View`
  flexDirection: row;
  display: flex;
  justifyContent: center;
  alignItems: center;
  height: 110px;
  width: 110px;
  borderRadius: ${avatarRadius}px;
  backgroundColor: #ffffff;
  marginVertical: 30px;
  borderWidth: 0.3px;
  borderColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;
const Logo = styled.Image`
  width: ${Platform.OS === 'ios' ? logoSize : 90}px;
  height: ${Platform.OS === 'ios' ? logoSize : 90}px;
`;

const SigninHead = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      {
        // fontLoaded ? (
        <ETASimpleText
          size={25}
          weight={Platform.OS === 'ios' ? '500' : '300'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          {variables.COMPANYNAME}
        </ETASimpleText>
        // ) : null
      }
      <LogoContainer>
        <Logo source={require('@assets/icons/app-icon.png')} />
      </LogoContainer>
      <ETASimpleText
        size={14}
        weight={Platform.OS === 'ios' ? '500' : '300'}
        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
        align={'left'}>
        {variables.COMPANYSLOGAN}
      </ETASimpleText>
    </Root>
  );
};

export default React.memo(SigninHead);
