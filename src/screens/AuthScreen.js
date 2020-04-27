import React, { useState, useEffect, useContext } from 'react';
import { Platform, Keyboard } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import SigninHead from '@components/Auth/Signin/SigninHead';
import SigninForm from '@components/Auth/Signin/SigninForm';
import SigninBody from '@components/Auth/Signin/SigninBody';

const Root = styled.View`
    flex: 1;
    flexDirection: column;
    backgroundColor: white;
    justifyContent: center;
`;
const BackImage = styled.ImageBackground`
    flex: 1;
    resizeMode: cover;
    justifyContent: center;
    zIndex: 10;
`;
// const InfoContainer = styled.View`
const InfoContainer = styled.KeyboardAvoidingView.attrs({
    behavior: 'height'
})`
    flex: 0.5;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
`;
const Card = styled.View`
    flex: 0.3;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    width: 80%;
    minHeight: 250px;
    paddingVertical: 10px;
    marginVertical: 5px;
    paddingHorizontal: 20px;
    marginHorizontal: 10px;
    shadowColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
    shadowOffset: 0px 2px;
    shadowRadius: 2px;
    shadowOpacity: 0.1;
    borderRadius: 5px;
    borderWidth: 0.075px;
    borderColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;

const AuthScreen = ({ navigation }) => {
    const _onOutSidePress = () => Keyboard.dismiss()

    return (
        <Root
            onPress={() => _onOutSidePress()}>
            <BackImage style={{width: null, height: null}}
                    source={require('@assets/background1.png')}>
                    <SigninHead />
                <InfoContainer>
                    <Card>
                        <SigninForm />
                        <SigninBody navigation={navigation} />
                    </Card>
                </InfoContainer>
            </BackImage>
        </Root>
    );
}

export default AuthScreen;