import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import { variables } from '@utils/constants';

const logoSize = 80;
const avatarRadius = logoSize / 2;

const Root = styled.View`
    flex: 0.15;
    flexDirection: row;
    justifyContent: flex-start;
    alignItems: center;
    marginTop: 10px;
    backgroundColor: transparent;
    paddingBottom: 20px;
`;
const LogoContainer = styled.View`
    flexDirection: row;
    display: flex;
    justifyContent: center;
    alignItems: center;
    height: 60px;
    width: 60px;
    borderRadius: ${avatarRadius}px;
    borderWidth: 0px;
    marginHorizontal: 10px;
    borderColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
    backgroundColor: #ffffff;
`;
const Logo = styled.Image`
    height: ${Platform.OS === 'ios' ? logoSize : 40}px;
    width: ${Platform.OS === 'ios' ? logoSize : 40}px;
    borderRadius: 5px;
`;
const ContentContainer = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    alignItems: flex-start;
    backgroundColor: transparent;
`;

const HeadTermsOfServiceComponent = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <LogoContainer>
                <Logo source={require('@assets/icons/app-icon.png')} />
            </LogoContainer>
            <ContentContainer>
                <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    {variables.COMPANYNAME}
                </ETASimpleText>
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    {variables.COMPANYSLOGAN}
                </ETASimpleText>
            </ContentContainer>
        </Root>
    );
}

export default React.memo(HeadTermsOfServiceComponent);
