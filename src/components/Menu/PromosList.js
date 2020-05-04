import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ETASimpleText, ETACard } from '@etaui';

const Root = styled.View`
    flex: 0.4;
    justifyContent: center;
    alignItems: center;
    marginTop: 10px;
`;
const Card = styled.View`
    backgroundColor: white;
    height: 200px;
    width: 285px;
    padding: 10px;
    margin: 1px;
    borderRadius: 4px;
`;
const Touchable = styled.TouchableOpacity``;
const PromosList = ({ data }) => {
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
                data={data}
                keyExtractor={item => item._id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // initialScrollIndex={1}
                renderItem={({item}) => {
                    return (
                    <Touchable
                        key={item._id}
                        onPress={() => _onPress(item)}>
                        <Card>
                            <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}>
                                {item.name}
                            </ETASimpleText>
                        </Card>
                    </Touchable>
                        // <ETACard {...item} />
                    );
                }}
            />
        </Root>
    );
}

export default PromosList;