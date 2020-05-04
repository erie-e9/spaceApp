import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import ForgetPasswordForm from '@components/Auth/ForgetPassword/ForgetPasswordForm';
import ForgetPasswordBody from '@components/Auth/ForgetPassword/ForgetPasswordBody';

const KeyboardMisser = styled.TouchableWithoutFeedback``;
const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: white;
`;
const InfoContainer = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
    flex: 0.2;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
`;

const ForgetPasswordScreen = () => {

    return (
        <KeyboardMisser onPress={() => Keyboard.dismiss()}>
            <Root>
                <InfoContainer>
                    <ForgetPasswordForm />
                </InfoContainer>
                <ForgetPasswordBody />
            </Root>
        </KeyboardMisser>
    );
}

export default ForgetPasswordScreen;