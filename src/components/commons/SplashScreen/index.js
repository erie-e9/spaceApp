import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
    flex: 1;
    flexDirection: column;
    display: flex;
    justifyContent: center;
    alignItems: center;
`; 
const Logo = styled.Image``;

const SplashScreen = () => {
    return (
        <Root>
            <Logo 
                style={{
                    height: Platform.OS === 'ios' ? icecreamLogoSize : 90,
                    width: Platform.OS === 'ios' ? icecreamLogoSize : 90,}}
                source={require('@assets/icons/app-icon.png')}/>
        </Root>
    );
}

export default SplashScreen;