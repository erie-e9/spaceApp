import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import { AntDesign } from '@icons'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	flex: 1;
    padding: 10px 0px 10px 0px;
	background-color: transparent;
`
const HeadContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
    padding: 0px 0px 0px 5px;
	background-color: transparent;
`
const ListItems = styled.FlatList`
    min-height: 10px;
    background-color: transparent;
`
const ItemContainer = styled.View`
    min-height: 10px;
    flex-direction: row;
    min-width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 1px 15px;
    margin-vertical: 3px;
    background-color: transparent;
`
const EmptyListContainer = styled.View`
    min-height: 10px;
	flex-direction: column;
	justify-content: center;
    align-items: center;
    padding-vertical: 20px;
	background-color: transparent;
`

const ProfileBodyComponent = () => {
    const themeContext = useContext(ThemeContext)
    const [ items, setitems ] = useState(null)
	const { last_moves, no_last_moves } = useTranslation()
    
    useEffect(() => {
        setitems([])
    }, [])

    return (
        <Root>
            <HeadContainer>
                <AntDesign name='bars' size={12} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} style={{ paddingHorizontal: 5 }} />
                <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '400' : '300'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'>
                    {last_moves.charAt(0).toUpperCase() + last_moves.slice(1)}
                </ETASimpleText>
            </HeadContainer>
            {
                [] !== null
                ?   <ListItems
                        contentContainerStyle={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 10
                        }}
                        data={items}
                        keyExtractor={(item) => item._id.toString()}
                        horizontal={!true}
                        initialNumToRender={5}
                        showsVerticalScrollIndicator={false}
                        updateCellsBatchingPeriod={3000}
                        ListEmptyComponent={() => (
                            <EmptyListContainer>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                            ? '400'
                                            : '300'
                                    }
                                    color={
                                        themeContext.PRIMARY_TEXT_COLOR_LIGHT
                                    }
                                    align='left'>
                                    {no_last_moves.charAt(0).toUpperCase() + no_last_moves.slice(1)}
                                </ETASimpleText>
                            </EmptyListContainer>
                        )}
                        renderItem={({item, i}) => {
                            return (
                                <ItemContainer>
                                    <ETARadio 
                                        text={item.title}
                                        sizeText={14}
                                        colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        onChange={() => setselected(!item.default)}
                                        activated={selected}
                                        sizeRadio={15}
                                        colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    />
                                    {/* {dynamicFlag(item.title)} */}
                                </ItemContainer>
                            )
                        }}
                    />
                :   null
            }
        </Root>
    )
}

export default ProfileBodyComponent
