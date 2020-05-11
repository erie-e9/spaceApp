import React from 'react';
import styled from 'styled-components';
import {ETACarousel} from '@etaui';
import MenuList1 from './MenuList1';
import Items from './items';

const Scroll = styled.ScrollView``;

const MenuComponent = (data) => {
  return (
    <>
      <Scroll
        horizontal={!true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ETACarousel />
        <Items />
        <MenuList1 data={data.menu} />
      </Scroll>
    </>
  );
};

export default MenuComponent;
