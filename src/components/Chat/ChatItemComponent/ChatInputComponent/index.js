import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, Pressable } from 'react-native'
import { Feather, MaterialIcons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: flex-end;
    margin-bottom: 6px;
    margin-right: 2px;
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
    min-height: 35px;
	margin-left: 3px;
    border-radius: 25px;
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
const InputMessage = styled.TextInput.attrs(props => ({
    multiline: true,
    autoCapitalize: 'none',
    color: props.theme.SECONDARY_TEXT_BACKGROUND_COLOR,
    placeholderTextColor: props.theme.PRIMARY_TEXT_COLOR_LIGHT
}))`
    flex: 1;
    margin-horizontal: 3px;
    max-height: 100px;
    min-height: 35px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`

const ChatInputComponent = () => {
    const themeContext = useContext(ThemeContext)
    const [ message, setmessage ] = useState('')
	const { type_message } = useTranslation()

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
                            height: 45,
                            width: 37,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2,
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
                        placeholder={type_message.charAt(0).toUpperCase() + type_message.slice(1)}
                    />
                    <TouchableWithoutFeedback
                        underlayColor='transparent'
                        onPress={() => _fileUoloader()}
                        style={{
                            height: 45,
                            width: 37,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 2,
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
                            height: 45,
                            width: 37,
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginHorizontal: 1,
                            paddingHorizontal: 2,
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