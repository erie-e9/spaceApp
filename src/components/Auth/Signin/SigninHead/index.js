import React from 'react';
import styled from 'styled-components/native';

const icecreamLogoSize = 110;
const avatarRadius = icecreamLogoSize / 2;
const slogan = '❝Change the World, One Scoop at a time...❞';
const NameCompany = 'iceCream Unicorn';

const Root = styled.View`
    flex: 0.3;
    justifyContent: center;
    alignItems: center;
`;
const CompanyName = styled.Text`
    color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
    fontWeight: bold;
    marginBottom: 5px;
`;
const Logo = styled.Image`

`;
const LogoContainer = styled.View`
    flexDirection: row;
    display: flex;
    justifyContent: center;
    alignItems: center;
    height: 110px;
    width: 110px;
    borderRadius: ${avatarRadius}px;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    marginVertical: 50px;
    borderWidth: 0.3px;
    borderColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
`;
const Slogan = styled.Text`
    color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
    width: 190px;
    textAlign: center;
    fontSize: 14px;
    fontStyle: italic;
    fontWeight: 600;
    marginTop: 15px;
`;

const SigninHead = () => {
    return (
        <Root>
            {
                // fontLoaded ? (
                // <CompanyName style={{fontFamily: 'Sacramento', fontSize: 37}}>
                //     {NameCompany}
                // </CompanyName>
                // ) : null
            }
            <LogoContainer>
                <Logo 
                    style={{
                        height: Platform.OS === 'ios' ? icecreamLogoSize : 90,
                        width: Platform.OS === 'ios' ? icecreamLogoSize : 90,}}
                    source={require('@assets/icons/app-icon.png')}/>
            </LogoContainer>    
            {/* <Slogan style={{letterSpacing: Platform.OS === 'ios' ? 1 : 2}}>
                {slogan}
            </Slogan> */}
        </Root>
    );
}

export default SigninHead;