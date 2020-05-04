import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ETASimpleText, ETACard } from '@etaui';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    marginTop: 10px;
`;
const Touchable = styled.TouchableOpacity``;

const OrdersList = ({ data }) => {
    const themeContext = useContext(ThemeContext);
    
    const _onPress = (item) => {
        console.warn(item);
    }
    
    return (
        <Root>
            <FlatList 
                contentContainerStyle={{
                    alignSelf: 'stretch'
                }}
                data={data.getOrders}
                keyExtractor={item => item._id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <Touchable
                            key={item._id}
                            onPress={() => _onPress(item)}>
                            <ETACard {...item} />
                        </Touchable>
                    );
                }
                }
            />
        </Root>
    );
}

export default OrdersList;