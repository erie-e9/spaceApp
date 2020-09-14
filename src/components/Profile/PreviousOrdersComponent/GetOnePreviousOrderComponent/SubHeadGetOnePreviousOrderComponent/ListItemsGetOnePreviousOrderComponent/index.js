import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import Item from './Item'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
    flex: 1;
`
const HeaderContainer = styled.View`
    width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	padding-vertical: 15px;
	padding-horizontal: 25px;
	border-top-width: 0.5px;
	border-top-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemsList = styled.FlatList``

const ListItemsGetOnePreviousOrderComponent = ({ items }) => {
    const themeContext = useContext(ThemeContext)
    
    return (
        <Root>
            <HeaderContainer>
                <ETASimpleText
                    size={16}
                    weight={
                        Platform.OS ===
                        'ios'
                        ? '400'
                        : 'bold'
                    }
                    color={
                        themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                    }
                    align='left'>
                    {items.length} items
                </ETASimpleText>
            </HeaderContainer>

            <ItemsList
                contentContainerStyle={{
                    flexDirection: 'column',
                }}
                data={items}
                keyExtractor={(item) => item._id.toString()}
                horizontal={!true}
                initialNumToRender={4}
                showsHorizontalScrollIndicator={!true}
                showsVerticalScrollIndicator
                renderItem={({item}) => {
                    return <Item item={item} />
                }}
            />
        </Root>
    )
}

export default ListItemsGetOnePreviousOrderComponent
