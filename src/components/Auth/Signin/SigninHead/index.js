import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const icecreamLogoSize = 110;
const avatarRadius = icecreamLogoSize / 2;
const slogan = '❝Change the World, One Scoop at a time...❞';
const NameCompany = 'iceCream Unicorn';

const Root = styled.View`
  flex: 0.3;
  justifyContent: center;
  alignItems: center;
`;
const Logo = styled.Image`
  width: ${Platform.OS === 'ios' ? icecreamLogoSize : 90}px;
  height: ${Platform.OS === 'ios' ? icecreamLogoSize : 90}px;
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
          {NameCompany}
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
        {slogan}
      </ETASimpleText>
    </Root>
  );
};

export default SigninHead;
