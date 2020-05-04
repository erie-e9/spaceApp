import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { ETAButtonFilled } from '@etaui';

let isSubmitting = !true;

const Root = styled.View`
    height: 40px;
    width: 100%;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
    marginVertical: 15px;
`;

const CardBottom = () => {
    const themeContext = useContext(ThemeContext);

    const handleSubmit = () => {
    }

    return (
        <Root>
            <ETAButtonFilled 
                title='RENOVAR MI CRÉDITO' 
                onPress={handleSubmit} 
                disabled={isSubmitting ? true : false} 
                colorButton={themeContext.SUCCESS_COLOR} 
                align={'center'}
                padding={30}
                />
        </Root>
    );
}

export default CardBottom;