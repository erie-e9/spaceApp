import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions } from 'react-native'
import { ETATextInputFilled } from '@etaui'
import { Feather, MaterialIcons } from '@icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { moderateScale } from 'react-native-size-matters'

const { width } = Dimensions.get('window')

const Root = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 1px;
    margin-bottom: 0px;
    padding: 1px 12.6px 2px 2px;
    background-color: transparent;
`
const InputIcon = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.PRIMARY_COLOR};
`

const ChatInputComponent = () => {
    const themeContext = useContext(ThemeContext)
    
    const _sendMessage = () => {
        console.log('ewe');
    }

    const _fileUoloader = () => {
        console.log('ewe');
    }
    
    return (
        <>
            <Root>
                <ETATextInputFilled
                    // value={values.cellphone}
                    placeholder='Type message...'
                    placeholderTextColor={
                        themeContext.PRIMARY_TEXT_COLOR_LIGHT
                    }
                    keyboardType='default'
                    autoCapitalize='none'
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
                    maxLength={200}
                    multiline={true}
                    numberOfLines={1} // android
                    returnKeyLabel='next' // android
                    secureTextEntry={false} // password
                    spellCheck
                    textContentType='none'
                    returnKeyType='next'
                    textsize={16}
                    height={moderateScale(45, 2)}
                    width={width - 105}
                    borderWidth={0.5}
                    // onChangeText={handleChange(
                    //     'cellphone',
                    // )}
                    // onBlur={handleBlur('cellphone')}
                    selectionColor={
                        themeContext.PRIMARY_COLOR
                    }
                    textColor={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    paddingHorizontal={15}
                />
                <TouchableWithoutFeedback
                    underlayColor='transparent'
                    onPress={() => _fileUoloader()}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 2,
                        backgroundColor: themeContext.PRIMARY_COLOR,
                    }}
                >
                    <MaterialIcons
                        name='attach-file'
                        size={18}
                        color='white'
                        style={{
                            alignSelf:
                                'center',
                        }}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    underlayColor='transparent'
                    onPress={() => _sendMessage()}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 2,
                        backgroundColor: themeContext.PRIMARY_COLOR,
                    }}
                >
                    <Feather
                        name='send'
                        size={18}
                        color='white'
                        style={{
                            alignSelf:
                                'center',
                        }}
                    />
                </TouchableWithoutFeedback>
            </Root>
        </>
    )
}

export default ChatInputComponent