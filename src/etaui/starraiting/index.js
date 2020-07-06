import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import {Ionicons} from '@icons';

const Root = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

const ETAStarRaiting = ({ raitings }) => {
    const themeContext = useContext(ThemeContext);
    let stars = [];

    for (let index = 1; index <= 5; index++) {
        let name = 'ios-star';
        if (index > raitings) {
            name = 'ios-star-outline';
        }
        stars.push((<Ionicons key={index} name={name} size={8.5} color={themeContext.STAR} style={{ marginHorizontal: 1 }} />));
    }

    return (
        <Root>
            {stars}
        </Root>
    );
}

export default React.memo(ETAStarRaiting);