import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 0.5;
  justify-content: flex-end;
  margin-top: 24px;
`;
const ButtonForgetPassword = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-bottom: 15px;
`;
const ButtonSignup = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-bottom: 15px;
`;

const SignInBody = ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  const signup = 'Sign up';
  const dontaccount = 'Do not have an account? ';
  const forgetpass = 'Did you forget your password? ';
  const _onShowSignupPress = () => {
    navigation.navigate('SignupScreen');
  };

  const _onShowForgetPasswordPress = () =>
    navigation.navigate('ForgetPasswordScreen');

  return (
    <Root>
      <ButtonForgetPassword onPress={() => _onShowForgetPasswordPress()}>
        <ETASimpleText
          size={14}
          weight={Platform.OS === 'ios' ? '500' : '300'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          {forgetpass}
        </ETASimpleText>
      </ButtonForgetPassword>

      <ButtonSignup onPress={() => _onShowSignupPress()}>
        <ETASimpleText
          size={14}
          weight={Platform.OS === 'ios' ? '500' : '300'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          {dontaccount}
          <ETASimpleText
            size={14}
            weight={Platform.OS === 'ios' ? '600' : '400'}
            color={themeContext.PRIMARY_COLOR}
            align={'left'}>
            {signup}
          </ETASimpleText>
        </ETASimpleText>
      </ButtonSignup>
    </Root>
  );
};

export default SignInBody;
