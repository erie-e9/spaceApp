import React from 'react';
import styled from 'styled-components/native';
import MenuComponent from '@components/Menu';
import data from '@utils/menu';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const MenuScreen = () => {
    return (
        <Root>
            <MenuComponent {...data} />
        </Root>  
      );
}

export default MenuScreen;