import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Root = styled.View`
    flex: 0.3;
    justifyContent: center;
`;
const ButtonForgetPassword = styled.TouchableOpacity`
    justifyContent: center;
    alignItems: center;
    zIndex: 1;
    marginBottom: 10px
`;
const ButtonForgetPasswordText1 = styled.Text`
    color: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
    fontSize: 14px;
    zIndex: 100;
`;
const ButtonSignup = styled.TouchableOpacity`
    justifyContent: center;
    alignItems: center;
    zIndex: 1;
    marginBottom: 10px
`;
const ButtonSignupText1 = styled.Text`
    color: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
    fontSize: 14px;
    zIndex: 100;
`;
const ButtonSignupText2 = styled.Text`
    color: ${props => props.theme.PRIMARY_COLOR};
    fontSize: 14px;
    fontWeight: 500;
`;

const SignInBody = ({ navigation }) => {
    const dontaccount = 'Do not have an account? ';
    const forgetpass = 'Did you forget your password? ';
    const _onShowSignupPress = () => {
        navigation.navigate('SignupScreen')
    };

    const _onShowForgetPasswordPress = () => navigation.navigate('ForgetPasswordScreen');
    
    return (
        <Root>
            <ButtonForgetPassword onPress={() => _onShowForgetPasswordPress()}>
                <ButtonForgetPasswordText1 style={{
                    fontWeight: Platform.OS === 'ios' ? '500' : '300'}}>
                    {forgetpass}
                </ButtonForgetPasswordText1>
            </ButtonForgetPassword>
            
            <ButtonSignup onPress={() => _onShowSignupPress()}>
                <ButtonSignupText1 style={{
                    fontWeight: Platform.OS === 'ios' ? '500' : '300'}}>
                    {dontaccount}
                    <ButtonSignupText2 style={{
                        fontWeight: Platform.OS === 'ios' ? '600' : '400'}}>
                            Sign up
                    </ButtonSignupText2>
                </ButtonSignupText1>
            </ButtonSignup>
        </Root>
    );
}

export default SignInBody;