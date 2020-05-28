import React from 'react';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import ForgetPasswordForm from '@components/Auth/ForgetPassword/ForgetPasswordForm';

const KeyboardMisser = styled.TouchableWithoutFeedback``;
const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const InfoContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 0.2;
  alignSelf: stretch;
  alignItems: center;
  justifyContent: center;
`;
const Card = styled.View`
  flex: 0.3;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  width: 80%;
  minHeight: 250px;
  paddingVertical: 10px;
  marginVertical: 5px;
  paddingHorizontal: 20px;
  marginHorizontal: 10px;
  shadowColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
  shadowOffset: 0px 2px;
  shadowRadius: 2px;
  shadowOpacity: 0.1;
  borderRadius: 5px;
  borderWidth: 0.075px;
  borderColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
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
