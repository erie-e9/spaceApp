import React from 'react';
import styled from 'styled-components/native';
import MenuComponent from '@components/Menu/MenuComponent';
import data from '@utils/menu';

const Root = styled.View``;

const MenuScreen = () => {
  return (
    <Root>
      <MenuComponent {...data} />
    </Root>
  );
};

export default MenuScreen;
