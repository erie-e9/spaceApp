import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import Item from './Item'
import { useTranslation } from '@etaui/translate'

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

const ListItemsGetOneProcessingOrderComponent = ({ orders }) => {
    const themeContext = useContext(ThemeContext)
	const { items, item } = useTranslation()
    
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
                    {orders.length} {' '}
                    {orders.length === 0
                        ? `${items}`
                        : orders.length === 1
                        ? `${item}`
                        : `${items}`
                    }
                </ETASimpleText>
            </HeaderContainer>

            <ItemsList
                contentContainerStyle={{
                    flexDirection: 'column',
                }}
                data={orders}
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

export default ListItemsGetOneProcessingOrderComponent
