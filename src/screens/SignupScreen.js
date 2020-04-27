import React, { useState, useEffect, useContext } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import SignupForm from '@components/Auth/Signup/SignupForm';

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
    behavior: 'height'
})`
    flex: 1;
    alignItems: center;
    justifyContent: center;
`;
const Card = styled.View`
    flex: 0.35;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    height: 290px;
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
    const _onOutSidePress = () => Keyboard.dismiss()

    return (
        <Root
            onPress={() => _onOutSidePress()}>
            <BackImage style={{width: null, height: null}}
                    source={require('@assets/background1.png')}>
                <InfoContainer>
                    <Card>
                        <SignupForm navigation={navigation} />
                    </Card>
                </InfoContainer>
            </BackImage>
        </Root>
    );
}

export default SignupScreen;