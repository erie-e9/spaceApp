import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETASwitch, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/settings/notifications/actions'
import { MaterialCommunityIcons, Feather } from '@icons'
import SubCard from './Card'
import { useTranslation } from '@etaui/translate'

const iconSize = 23

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 5px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SettingContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	min-height: 10px;
	padding: 0px 5px;
	background-color: transparent;
`
const ItemContainer = styled.View`
    width: 100%;
	justify-content: flex-start;
	padding: 0px 20px;
	background-color: transparent;
`
const SubtitleText = styled.View`
    margin: 5px 0px 0px 5px;
    padding-left: 5px;
	background-color: transparent;
`
const ButtonModalContainer = styled.View`
	height: 50px;
	width: 100%;
    margin: 10px 0px 0px 0px;
	align-items: center;
	align-self: center;
	background-color: transparent;
`
const MetadataInfoHead = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 2.5px 10px 2.5px 10px;
	background-color: transparent;
`
const LeftContainer = styled.View`
	flex: 1;
	flex-direction: row;
`
const OptionTitleContainer = styled.View`
	flex: 1;
	flex-direction: column;
	padding: 0px 0px 0px 2px;
	background-color: transparent;
`
const IconContainer = styled.View`
	flex: 0.11;
	justify-content: flex-start;
	align-items: center;
	padding: 0px 0px 0px 0px;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { data } = state.notifications

	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const ChatsSettingsComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const [ switchItem, setswitchItem ] = useState(true)
    const [ _switchItem, _setswitchItem ] = useState()
	const [ isLanguageModalVisible, setisLanguageModalVisible ] = useState(false)
	const { status,
        status_text,
        active,
        new_message_sound,
        new_message_sound_text,
        black_list,
        black_list_text,
        download_files,
        download_files_text,
        automatically,
        default_text
    } = useTranslation()
    
	useEffect(() => {
        let isUnMounted = false
		// getDataRequest()
        // console.log('[ChatsSettingsComponent] data: ', data);
        
		return () => {
			isUnMounted = true
		}
    }, [data])
    
	const _switch = async (item) => {
		await setswitchItem(!switchItem)
		await _setswitchItem(item)
    }
    
	return (
		<Root>
            
            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={13}
                        weight={Platform.OS === 'ios' ? '400' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align='left'
                        style={{ marginTop: 10, marginBottom: 1 }}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {status_text.charAt(0).toUpperCase() + status_text.slice(1)}
                        </ETASimpleText>
                    </SubtitleText>
                    <MetadataInfoHead>
                        <ETASimpleText
                            size={13}
                            weight={
                                Platform.OS === 'ios'
                                    ? '600'
                                    : '800'
                            }
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            {active.charAt(0).toUpperCase() + active.slice(1)}
                        </ETASimpleText>
                        <ETASwitch
                            // onChange={() => { setswitchItem(!switchItem); _setswitchItem(headTitleID)}}
                            onChange={() => null}
                            activated={switchItem}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </MetadataInfoHead>
                </ItemContainer>
            </SettingContainer>

            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={13}
                        weight={Platform.OS === 'ios' ? '400' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align='left'
                        style={{ marginTop: 10, marginBottom: 1 }}>
                        {new_message_sound.charAt(0).toUpperCase() + new_message_sound.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {new_message_sound_text.charAt(0).toUpperCase() + new_message_sound_text.slice(1)}
                        </ETASimpleText>
                    </SubtitleText>
                    <ButtonModalContainer>
                        <ETAButtonFilled
                            title={default_text.charAt(0).toUpperCase() + default_text.slice(1)}
                            onPress={() => setisLanguageModalVisible(true)}
                            disabled={1 === 0 ? true : false}
                            colorButton={
                                themeContext.SECONDARY_BACKGROUND_COLOR
                            }
                            padding={10}
                            width={240}
                            borderRadius={3}
                        />
                    </ButtonModalContainer>
                </ItemContainer>
            </SettingContainer>

            <SettingContainer>
                <LeftContainer>
                    <IconContainer>
                        <MaterialCommunityIcons
                            name='account-cancel'
                            size={
                                iconSize -
                                3
                            }
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </IconContainer>
                    <OptionTitleContainer>
                        <ETASimpleText
                            size={13}
                            weight={
                                Platform.OS ===
                                'ios'
                                    ? '400'
                                    : '800'
                            }
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            {black_list.charAt(0).toUpperCase() + black_list.slice(1)}
                        </ETASimpleText>
                        <SubCard
                            headTitle=' '
                            message={black_list_text.charAt(0).toUpperCase() + black_list_text.slice(1)}
                            />
                    </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                    <Feather
                        name='chevron-right'
                        size={13}
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                    />
                </IconContainer>
            </SettingContainer>

            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={13}
                        weight={Platform.OS === 'ios' ? '400' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align='left'
                        style={{ marginTop: 10, marginBottom: 1 }}>
                        {download_files.charAt(0).toUpperCase() + download_files.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {download_files_text.charAt(0).toUpperCase() + download_files_text.slice(1)}
                        </ETASimpleText>
                    </SubtitleText>
                    <MetadataInfoHead>
                        <ETASimpleText
                            size={13}
                            weight={
                                Platform.OS === 'ios'
                                    ? '600'
                                    : '800'
                            }
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            {automatically.charAt(0).toUpperCase() + automatically.slice(1)}
                        </ETASimpleText>
                        <ETASwitch
                            // onChange={() => { setswitchItem(!switchItem); _setswitchItem(headTitleID)}}
                            onChange={() => null}
                            activated={switchItem}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </MetadataInfoHead>
                </ItemContainer>
            </SettingContainer>
        </Root>
    )
}
    
const ChatsSettingsComponentConnect = connect(
    mapStateToProps,
    mapDispatchProps,
)(ChatsSettingsComponent)

export default React.memo(ChatsSettingsComponentConnect)
