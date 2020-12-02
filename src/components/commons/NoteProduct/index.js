import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETAFancyModal, ETATextInputOutline, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST, UPDATE_NOTE } from '@redux/cart/actions'

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
    
    useEffect(() => {
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
    }, [_id, data])
    
    const _onPressItem = () => {
        updateNote({_id, note})
        closeModal()
    }

    return(
        <Root>
            <ETAFancyModal
                title={`Note for ${title}`}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                    <ETATextInputOutline
                        // ref={textinputRef}
                        value={note}
                        placeholder='Type a note...'
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
                    />
                    <ButtonContainer>
                        <ETAButtonFilled
                            title='Save note'
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