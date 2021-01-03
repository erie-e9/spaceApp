import React, { useState, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-community/google-signin'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'
  
const Root = styled.View`
    width: 100%;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
`
const TextContainer = styled.View`
    width: 100%;
    margin: 25px 0px 10px 0px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`

  const AuthSocialmedia = memo(() => {
	const themeContext = useContext(ThemeContext)
    const { or_use_social } = useTranslation()

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
                    size={15}
                    weight={Platform.OS === 'ios' ? '400' : '400'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align='left'>
                    {or_use_social.charAt(0).toUpperCase() + or_use_social.slice(1)}
                </ETASimpleText>
            </TextContainer>
            <GoogleSigninButton
                style={{ width: 255, height: 48, marginVertical: 0 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
                disabled={false} 
            />
        </Root>
    )
})

export default AuthSocialmedia