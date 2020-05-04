import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native'
import styled, { ThemeContext } from 'styled-components';
import PromosList from './PromosList';
import MenuList1 from './MenuList1';

const Scroll = styled.ScrollView`
    flex:1;
    `;

const MenuComponent = (data) => {
    
    return (
        <>
            {/* <ScrollView 
                style={{ flex: 1 }}
                horizontal={!true}
                showsHorizontalScrollIndicator={false}> */}
                {/* <PromosList data={data.promos}/> */}
                {/* <MenuList1 data={data.menu}/>
                <MenuList1 data={data.menu}/>
                <MenuList1 data={data.menu}/> */}
            {/* </ScrollView> */}
        </>
    );
}

export default MenuComponent;