import React from 'react';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import SignupForm from '@components/Auth/Signup/SignupForm';

const KeyboardMisser = styled.TouchableWithoutFeedback``;
const Root = styled.View`
  flex: 1;
  justify-content: center;
`;
// const BackImage = styled.ImageBackground`
//   flex: 1;
//   resize-mode: cover;
//   justify-content: center;
// `;
// const InfoContainer = styled.View`
const InfoContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'position' : 'height',
})`
  flex: 0.6;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
const Card = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  padding-horizontal: 20px;
  margin-horizontal: 20px;
  shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
  shadow-offset: 0px 2px;
  shadow-radius: 2px;
  shadow-opacity: 0.1;
  border-radius: 5px;
  border-width: 0.075px;
  border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;
// height: 300px;
// min-height: 240px;

const SignupScreen = ({navigation}) => {
  return (
    <KeyboardMisser onPress={() => Keyboard.dismiss()}>
      <Root>
        {/* <BackImage style={{width: null, height: null}}
                        source={require('@assets/background1.png')}> */}
        <InfoContainer>
          <Card>
            <SignupForm navigation={navigation} />
          </Card>
        </InfoContainer>
        {/* </BackImage> */}
      </Root>
    </KeyboardMisser>
  );
};

export default SignupScreen;
