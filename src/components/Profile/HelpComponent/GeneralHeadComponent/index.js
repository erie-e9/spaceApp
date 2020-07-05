import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import { variables } from '@utils/constants';

const logoSize = 80;
const avatarRadius = logoSize / 2;

const Root = styled.View`
    flex: 0.3;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
    padding: 15px;
`;
const ContentContainer = styled.View`
    minHeight: 20px;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
    padding: 10px 20px;
`;
const LogoContainer = styled.View`
    flexDirection: row;
    display: flex;
    justifyContent: center;
    alignItems: center;
    height: 80px;
    width: 80px;
    borderRadius: ${avatarRadius}px;
    backgroundColor: #ffffff;
    borderWidth: 0.3px;
    borderColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const Logo = styled.Image`
    height: ${Platform.OS === 'ios' ? logoSize : 70}px;
    width: ${Platform.OS === 'ios' ? logoSize : 70}px;
    borderRadius: 5px;
`;

const GeneralHeadComponent = ({imagePath}) => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <LogoContainer>
                <Logo source={imagePath} />
            </LogoContainer>
            <ContentContainer>
                <ETASimpleText
                    size={17}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    {variables.COMPANYNAME}
                </ETASimpleText>
                <ETASimpleText
                    size={13}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    {variables.COMPANYSLOGAN}
                </ETASimpleText>
            </ContentContainer>
        </Root>
    );
}

export default React.memo(GeneralHeadComponent);
