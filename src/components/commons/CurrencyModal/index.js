import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETAFancyModal, ETASimpleText, ETAButtonFilled, ETARadio } from '@etaui'
import Item from './item'

const Root = styled.View`
	min-height: 10px;
    width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const ListItems = styled.FlatList`
    min-height: 10px;
    background-color: transparent;
`
const ButtonContainer = styled.View`
    height: 50px;
	width: 100%;
	align-items: center;
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

const CurrencyModal = memo(({ isVisible, data, onSwipeComplete, closeModal }) => {
    const themeContext = useContext(ThemeContext)
	const [ items, setitems ] = useState(null)
	const [ selected, setselected ] = useState(true)
    
    useEffect(() => {
        setitems(data)
    }, [data])

    const _onPressItem = () => {
        closeModal()
    }

    return(
        <Root>
            <ETAFancyModal
                title={`Choose currency`}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                    {
                        data.length > 0
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
                                            There're no languages availables.
                                        </ETASimpleText>
                                    </EmptyListContainer>
                                )}
                                renderItem={({item, i}) => <Item {...item}/>}
                            />
                        :   null
                    }
                    <ButtonContainer>
                        <ETAButtonFilled
                            title='Apply'
                            onPress={() => _onPressItem()}
                            colorButton={
                                themeContext.SECONDARY_BACKGROUND_COLOR
                            }
                            padding={10}
                            width={250}
                            borderRadius={3}
                        />
                    </ButtonContainer>
                </>
            </ETAFancyModal>
        </Root>
    )
})

export default CurrencyModal