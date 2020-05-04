import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import SignupForm from '@components/Auth/Signup/SignupForm';

const KeyboardMisser = styled.TouchableWithoutFeedback``
const Root = styled.View`
    flex: 1;
    backgroundColor: white;
    justifyContent: center;
`;
const BackImage = styled.ImageBackground`
    flex: 1;
    resizeMode: cover;
    justifyContent: center;
`;
// const InfoContainer = styled.View`
const InfoContainer = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'position' : 'height'
})`
    flex: 0.6;
    alignItems: center;
    justifyContent: center;
    zIndex: 10
`;
const Card = styled.View`
    flex: 1.2;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    height: 300px;
    minHeight: 240px;
    paddingHorizontal: 20px;
    marginHorizontal: 20px;
    shadowColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
    shadowOffset: 0px 2px;
    shadowRadius: 2px;
    shadowOpacity: 0.1;
    borderRadius: 5px;
    borderWidth: 0.075px;
    borderColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;

const SignupScreen = ({ navigation }) => {

    return (
        <KeyboardMisser onPress={() => Keyboard.dismiss()}>
            <Root>
                <BackImage style={{width: null, height: null}}
                        source={require('@assets/background1.png')}>
                        <InfoContainer>
                            <Card>
                                <SignupForm navigation={navigation} />
                            </Card>
                        </InfoContainer>
                </BackImage>
            </Root>
        </KeyboardMisser>
    );
}

export default SignupScreen;