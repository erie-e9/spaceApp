import React, { useContext } from 'react';
import { Platform } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ETASimpleText } from '@etaui';

const Root = styled.View`
flex: 1;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    width: 100%;
`;
const OrderContentContainer = styled.View`
    flex: 1;
    padding: 10px 20px 10px 0px;
`;

const CardBody = ({ text }) => {
    const themeContext = useContext(ThemeContext);

    return(
        <Root>
            <OrderContentContainer>
                <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}>
                    {text}
                </ETASimpleText>
            </OrderContentContainer>
        </Root>
    );
}

export default CardBody;