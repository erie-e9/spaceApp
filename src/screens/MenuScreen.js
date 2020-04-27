import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;
const T = styled.Text`

`;

const MenuScreen = () => {
    return (
        <Root>
            <T>Menu</T>
        </Root>  
      );
}

export default MenuScreen;