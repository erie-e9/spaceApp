import React from 'react';
import styled from 'styled-components/native';
import ETASimpleText from '@etaui/texts/simple';

const Root = styled.View`
    flex: 1;
    marginVertical: 5px;
    paddingHorizontal: 10px;
`;

const ETAErrorMessage = ({ children }) => {

    return (
        <>
            <Root>
                <ETASimpleText size={12} weight='700' color={'brown'} align={'left'}>
                    {children}
                </ETASimpleText>
            </Root>
        </>
    );
}

export default ETAErrorMessage;