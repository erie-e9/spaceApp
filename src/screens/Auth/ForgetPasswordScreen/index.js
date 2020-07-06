import React from 'react';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import ForgetPasswordForm from '@components/Auth/ForgetPassword/ForgetPasswordForm';

const KeyboardMisser = styled.TouchableWithoutFeedback``;
const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InfoContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 0.2;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;
const Card = styled.View`
  flex: 0.3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  width: 80%;
  min-height: 250px;
  padding-vertical: 10px;
  margin-vertical: 5px;
  padding-horizontal: 20px;
  margin-horizontal: 10px;
  shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
  shadow-offset: 0px 2px;
  shadow-radius: 2px;
  shadow-opacity: 0.1;
  border-radius: 5px;
  border-width: 0.075px;
  border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;

const ForgetPasswordScreen = () => {
  return (
    <KeyboardMisser onPress={() => Keyboard.dismiss()}>
      <Root>
        <InfoContainer>
          <Card>
            <ForgetPasswordForm />
          </Card>
        </InfoContainer>
      </Root>
    </KeyboardMisser>
  );
};

export default ForgetPasswordScreen;
