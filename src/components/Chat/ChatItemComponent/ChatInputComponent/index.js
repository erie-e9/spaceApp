import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, Pressable } from 'react-native'
import { ETATextInputFilled } from '@etaui'
import { Feather, MaterialIcons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { moderateScale } from 'react-native-size-matters'

const { width } = Dimensions.get('window')

const Root = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-right: 1px;
    margin-bottom: 6px;
    padding: 1px 12.6px 0px 2px;
    background-color: transparent;
`
const InputIcon = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.PRIMARY_COLOR};
`
const LeftContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
	align-items: flex-end;
    padding: 0px 10px;
	margin-left: 3px;
    border-radius: 25px;
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
const InputMessage = styled.TextInput.attrs(props => ({
    multiline: true,
    placeholder: 'Type a message',
    autoCapitalize: 'none',
    // autoFocus: true,
    color: props.theme.SECONDARY_TEXT_BACKGROUND_COLOR,
    placeholderTextColor: props.theme.SECONDARY_TEXT_BACKGROUND_COLOR
}))`
    flex: 1;
    margin-horizontal: 3px;
    max.height: 100px;
    background-color: transparent;
`

const ChatInputComponent = () => {
    const themeContext = useContext(ThemeContext)
    const [ message, setmessage ] = useState('')

    const _onMicrophonePress = () => {
        console.warn('_onMicrophonePress')
    }

    const _onSendMessagePress = () => {
        console.warn('_onSendMessagePress', message)
        setmessage('')
    }

    const _onEmoticonsPress = () => {
     
    }

    const _fileUoloader = () => {
        console.log('_fileUoloader');
    }
    
    return (
        <>
            <Root>
                <LeftContainer>
                    <TouchableWithoutFeedback
                        underlayColor='transparent'
                        onPress={() => _onEmoticonsPress()}
                        style={{
                            height: 34,
                            width: 34,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 1,
                            paddingHorizontal: 2,
                            paddingVertical: 25
                            // backgroundColor: themeContext.PRIMARY_COLOR,
                        }}
                    >
                        <FontAwesome5
                            name='laugh'
                            size={18}
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            style={{
                                alignSelf:
                                    'center',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <InputMessage
                        value={message} 
                        onChangeText={setmessage}
                    />
                    {/*                     
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
                        height={moderateScale(42, 2)}
                        width={width - 150}
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
                    /> */}
                    <TouchableWithoutFeedback
                        underlayColor='transparent'
                        onPress={() => _fileUoloader()}
                        style={{
                            height: 34,
                            width: 34,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 1,
                            paddingHorizontal: 2,
                            paddingVertical: 25
                            // backgroundColor: themeContext.PRIMARY_COLOR,
                        }}
                    >
                        <MaterialIcons
                            name='attach-file'
                            size={18}
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            style={{
                                alignSelf:
                                    'center',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        underlayColor='transparent'
                        onPress={() => _fileUoloader()}
                        style={{
                            height: 34,
                            width: 34,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 1,
                            paddingHorizontal: 2,
                            paddingVertical: 25
                            // backgroundColor: themeContext.PRIMARY_COLOR,
                        }}
                    >
                        <Entypo
                            name='camera'
                            size={18}
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            style={{
                                alignSelf:
                                    'center',
                            }}
                        />
                    </TouchableWithoutFeedback>
                </LeftContainer>
                {
                    message === ''
                ?   <Pressable
                        underlayColor='transparent'
                        onPress={() => _onMicrophonePress()}
                        style={{
                            height: 38,
                            width: 38,
                            borderRadius: 19,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 3,
                            marginVertical: 5,
                            backgroundColor: themeContext.PRIMARY_COLOR,
                        }}
                    >
                        <MaterialCommunityIcons
                            name='microphone'
                            size={20}
                            color='white'
                            style={{
                                alignSelf:
                                    'center',
                            }}
                        />
                    </Pressable>
                :   <TouchableWithoutFeedback
                        underlayColor='transparent'
                        onPress={() => _onSendMessagePress()}
                        style={{
                            height: 38,
                            width: 38,
                            borderRadius: 19,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 3,
                            marginVertical: 5,
                            backgroundColor: themeContext.PRIMARY_COLOR,
                        }}
                    >
                        <Feather
                            name='send'
                            size={20}
                            color='white'
                            style={{
                                alignSelf:
                                    'center',
                            }}
                        />
                    </TouchableWithoutFeedback>
                }
            </Root>
        </>
    )
}

export default ChatInputComponent