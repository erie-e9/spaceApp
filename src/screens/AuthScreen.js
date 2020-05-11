import React from 'react';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import SigninHead from '@components/Auth/Signin/SigninHead';
import SigninForm from '@components/Auth/Signin/SigninForm';
import SigninBody from '@components/Auth/Signin/SigninBody';

const KeyboardMisser = styled.TouchableWithoutFeedback``;
const Root = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
`;
// const BackImage = styled.ImageBackground`
//   flex: 1;
//   resizemode: cover;
//   justifyContent: center;
//   zIndex: 10;
// `;
// const InfoContainer = styled.View`
const InfoContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
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

const AuthScreen = ({navigation}) => {
  return (
    <KeyboardMisser onPress={() => Keyboard.dismiss()}>
      <Root>
        {/* <BackImage style={{width: null, height: null}}
                        source={require('@assets/background1.png')}> */}
        <SigninHead />
        <InfoContainer>
          <Card>
            <SigninForm />
            <SigninBody navigation={navigation} />
          </Card>
        </InfoContainer>
        {/* </BackImage> */}
      </Root>
    </KeyboardMisser>
  );
};

export default AuthScreen;
