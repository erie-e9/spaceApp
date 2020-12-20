import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETAFancyModal, ETASimpleText, ETAButtonFilled, ETARadio } from '@etaui'
import { MXIcon, USIcon, FRIcon } from '@icons'

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

const LanguageModal = memo(({ isVisible, data, onSwipeComplete, closeModal }) => {
    const themeContext = useContext(ThemeContext)
	const [ items, setitems ] = useState(null)
	const [ selected, setselected ] = useState(true)
    
    useEffect(() => {
        setitems(data)
    }, [data])

    const dynamicFlag = (language) => {
        switch (language) {
            case 'es':
                return <MXIcon />
            case 'en':
                return <USIcon />
            case 'fr':
                return <FRIcon />
        
            default:
                return <MXIcon />
        }
    }
    
    const _onPressItem = () => {
        closeModal()
    }

    return(
        <Root>
            <ETAFancyModal
                title={`Choose language`}
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
                                    paddingVertical: 10
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
                                renderItem={({item, i}) => {
                                    return (
                                        <ItemContainer>
                                            <ETARadio 
                                                text={item.language}
                                                sizeText={14}
                                                colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                                onChange={() => setselected(!item.default)}
                                                activated={selected}
                                                sizeRadio={15}
                                                colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                            />
                                            {dynamicFlag(item.value)}
                                        </ItemContainer>
                                    )
                                }}
                            />
                        :   null
                    }
                    <ButtonContainer>
                        <ETAButtonFilled
                            title='Apply'
                            onPress={() => _onPressItem()}
                            // disabled={data.length === 0 ? true : false}
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

export default LanguageModal