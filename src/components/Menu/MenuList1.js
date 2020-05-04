import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { ETASimpleText, ETACard, ETAHeaderText } from '@etaui';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    marginTop: 10px;
    marginHorizontal: 10px;
`;
const Card = styled.View`
    backgroundColor: white;
    height: 240px;
    width: 190px;
    padding: 10px;
    margin: 1px;
    borderRadius: 4px;
`;
const HeadContainer = styled.View`
    flex: 1;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    margin: 10px;
`;
const ListContainer = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    alignItems: center;
`;
const Touchable = styled.TouchableOpacity``;

const MenuList = ({ data }) => {
    const themeContext = useContext(ThemeContext);

    const _onPress = (item) => {
        console.warn(item);
    }

    return (
        <Root>
            <HeadContainer>
                <ETAHeaderText size={22} weight='600' color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}>Title List</ETAHeaderText>
                <Touchable>
                    <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}>
                        See more
                    </ETASimpleText>
                </Touchable>
            </HeadContainer>
            <ListContainer>
                <FlatList 
                    contentContainerStyle={{
                        alignSelf: 'stretch'
                    }}
                    data={data}
                    keyExtractor={item => item._id.toString()}
                    horizontal={true}
                    // numColumns={2}
                    showsHorizontalScrollIndicator={false}
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
            </ListContainer>
        </Root>
    );
}

export default MenuList;