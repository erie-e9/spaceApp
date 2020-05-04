import React, { useContext } from 'react';
import { Platform } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ETASimpleText } from '@etaui';

const Root = styled.View`
    flex: 0.1;
    justifyContent: flex-start;
    alignItems: center;
    marginHorizontal: 70px;
`;


const ForgetPasswordBody = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}>
                We will send you a SMS with instructions for recover your password.
            </ETASimpleText>
        </Root>
    );
}

export default ForgetPasswordBody;