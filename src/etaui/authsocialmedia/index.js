import React, { useState, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-community/google-signin'
import { ETASimpleText } from '@etaui'
  
const Root = styled.View`
    flex: 1;
    width: 100%;
	flex-direction: column;
	align-items: center;
	background-color: red;
`
const TextContainer = styled.View`
    width: 100%;
    padding: 20px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: transparent;
`

  const AuthSocialmedia = memo(() => {
	const themeContext = useContext(ThemeContext)
    
	GoogleSignin.configure({
		scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
		webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
		offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		hostedDomain: '', // specifies a hosted domain restriction
		loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
		forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
		accountName: '', // [Android] specifies an account name on the device that should be used
	    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    
    const _signIn = () => {

    }

    const _isSigninInProgress = () => {

    }

    return (
        <Root>
            <TextContainer>
                <ETASimpleText
                    size={16}
                    weight={Platform.OS === 'ios' ? '700' : '900'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align='left'>
                    Continue with...
                </ETASimpleText>
            </TextContainer>
            <GoogleSigninButton
                style={{ width: 255, height: 48, marginVertical: 20 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
                disabled={false} 
            />
        </Root>
    )
})

export default AuthSocialmedia