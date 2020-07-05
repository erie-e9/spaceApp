import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import {fakeavatar} from '@utils/constants';

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
    backgroundColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
    borderWidth: 0.3px;
    borderColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const Logo = styled.Image`
    height: ${Platform.OS === 'ios' ? logoSize : 70}px;
    width: ${Platform.OS === 'ios' ? logoSize : 70}px;
    borderRadius: 45px;
`;

const HeadPaymentMethodComponent = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <LogoContainer>
                <Logo source={{ uri: fakeavatar }} />
            </LogoContainer>
            <ContentContainer>
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '300' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    Member from 5 jun 2017 
                </ETASimpleText>
            </ContentContainer>
        </Root>
    );
}

export default React.memo(HeadPaymentMethodComponent);
