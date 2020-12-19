import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETAFancyModal, ETATextInputOutline, ETAButtonFilled } from '@etaui'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const ButtonContainer = styled.View`
	height: 50px;
	width: 100%;
	align-items: center;
	background-color: transparent;
`

const DiscountCodeModal = memo(({ isVisible, onSwipeComplete, closeModal }) => {
    const themeContext = useContext(ThemeContext)
    
    const _onPressItem = () => {
        closeModal()
    }
    
    return(
        <Root>
            <ETAFancyModal
                title={`Discount Code`}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                    <ETATextInputOutline
                        // ref={textinputRef}
                        value=''
                        placeholder='Do you have a discount code?'
                        placeholderTextColor={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        keyboardType='default'
                        autoCapitalize='words'
                        allowFontScaling
                        autoCorrect
                        autoFocus
                        blurOnSubmit={false}
                        caretHidden={false}
                        clearButtonMode='while-editing'
                        contextMenuHidden={false}
                        editable
                        enablesReturnKeyAutomatically={false}
                        underlineColorAndroid='transparent'
                        keyboardAppearance='dark'
                        maxLength={250}
                        multiline={true}
                        numberOfLines={1} // android
                        returnKeyLabel='next' // android
                        secureTextEntry={false} // password
                        spellCheck
                        textContentType='none'
                        returnKeyType='next'
                        textsize={14}
                        height={40}
                        width={270}
                        borderWidth={0.3}
                        // onChangeText={text => {onChangeValue([item.name], text); setdisabledState(values?.[item.name] !== '' ? false : true)}}
                        // onBlur={handleBlur('cellphone')}
                        selectionColor={themeContext.PRIMARY_COLOR}
                    />
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

export default DiscountCodeModal