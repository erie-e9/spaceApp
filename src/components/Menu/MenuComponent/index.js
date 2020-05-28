import React from 'react';
import styled from 'styled-components';
import {ETACarousel} from '@etaui';
import MenuList from './menuList';
import Categories from './categories';

const Scroll = styled.ScrollView``;
const HeaderContainer = styled.View`
  marginTop: 5px;
`;

const MenuComponent = (data) => {
  return (
    <>
      <Scroll
        horizontal={!true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <ETACarousel />
        </HeaderContainer>
        <Categories categories={data.menu1} />
        <MenuList data={data.menu1} title='Dazzler sundaes' />
        <MenuList data={data.menu2} title='Cups and cones'/>
        <MenuList data={data.menu3} title='Milkshakes'/>
        <MenuList data={data.menu4} title='Smoothies and frappes'/>
        <MenuList data={data.menu5} title='Cookie sandwiches'/>
      </Scroll>
    </>
  );
};

export default MenuComponent;
