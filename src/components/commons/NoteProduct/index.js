import React, { useState, useEffect, useContext, memo, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETAFancyModal, ETATextInputOutline, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST, UPDATE_NOTE } from '@redux/cart/actions'
import { useTranslation } from '@etaui/translate'

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
const InputText = styled.TextInput.attrs(props => ({
    multiline: true,
    autoCapitalize: 'none',
    autoFocus: true,
    color: props.theme.SECONDARY_TEXT_BACKGROUND_COLOR,
    placeholderTextColor: props.theme.PRIMARY_TEXT_COLOR_LIGHT
}))`
    width: 100%;
    max-height: 100px;
    min-height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border-width: 0px;
    border-bottom-width: 0.4px;
    margin-vertical: 10px;
    margin-horizontal: 3px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
    background-color: transparent;
`

const mapStateToProps = (state, props) => {
    const { data } = state.cart
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
    getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {},
		})
    },
    
    updateNote: (paramItem) => {
        dispatch({
            type: UPDATE_NOTE,
            payload: {
                paramItem
            }
        })
    },
})

const NoteProduct = memo(({ _id, title, isVisible, onSwipeComplete, closeModal, getDataRequest, data, updateNote }) => {
    const themeContext = useContext(ThemeContext)
    const [ note, setnote ] = useState('')
    const input = useRef()
	const { note_for, type_note, save_note } = useTranslation()

    useEffect(() => {
        input.current?.focus()
    }, [isVisible])
    
    useEffect(() => {
        let isUnMounted = false
        getDataRequest()
        if (data !== []) {
            const itemFound = data.find(
                (element) => element._id === _id
            )
            if (itemFound) {
                setnote(itemFound.note)                
            } else {
                setnote('')
            }
        }
        
		return () => {
			isUnMounted = true
		}
    }, [_id, data])
    
    const _onPressItem = () => {
        updateNote({_id, note})
        closeModal()
    }

    return(
        <Root>
            <ETAFancyModal
                title={`${note_for.charAt(0).toUpperCase() + note_for.slice(1)} ${title}`}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                
                    <InputText
                        refs={input}
                        value={note}
                        placeholder={`${type_note.charAt(0).toUpperCase() + type_note.slice(1)}...`}
                        placeholderTextColor={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        keyboardType='default'
                        onChangeText={text => setnote(text)}
                    />
                    {/* <ETATextInputOutline
                        refs={input}
                        value={note}
                        placeholder={`${type_note.charAt(0).toUpperCase() + type_note.slice(1)}...`}
                        placeholderTextColor={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        allowFontScaling
                        autoCorrect
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
                        autofocus={true}
                        height={40}
                        width={270}
                        borderWidth={0.3}
                        onChangeText={text => setnote(text)}
                        // onBlur={handleBlur('cellphone')}
                        selectionColor={themeContext.PRIMARY_COLOR}
                    /> */}
                    <ButtonContainer>
                        <ETAButtonFilled
                            title={`${save_note.charAt(0).toUpperCase() + save_note.slice(1)}`}
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

const NoteProductConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NoteProduct)

export default NoteProductConnect