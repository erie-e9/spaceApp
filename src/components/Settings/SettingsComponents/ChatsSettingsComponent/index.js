import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETASwitch, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/settings/notifications/actions'
import { MaterialCommunityIcons, Feather } from '@icons'
import SubCard from './Card'

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
	align-items: center;
	min-height: 50px;
	padding: 2.5px 5px;
	margin-vertical: 0px;
	background-color: transparent;
`
const ItemContainer = styled.View`
    width: 100%;
    margin: 0px 0px 10px 0px;
	padding: 0px 15px;
	background-color: transparent;
`
const SubtitleText = styled.View`
    margin: 0px 0px 0px 5px;
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
const MetadaInfoHead = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 10px 2px 10px;
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
	const [ isCurrencyModalVisible, setisCurrencyModalVisible ] = useState(false)
    
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
                        Satus
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            Your friends and contacts will see if you're active or your last connection time, at least you deactivate active status. You cannot see status of your friends if you deactivate it.
                        </ETASimpleText>
                    </SubtitleText>
                    <MetadaInfoHead>
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
                            Active
                        </ETASimpleText>
                        <ETASwitch
                            // onChange={() => { setswitchItem(!switchItem); _setswitchItem(headTitleID)}}
                            onChange={() => null}
                            activated={switchItem}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </MetadaInfoHead>
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
                        New message sound
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            English is language by default, but if you want you could change this option.
                        </ETASimpleText>
                    </SubtitleText>
                    <ButtonModalContainer>
                        <ETAButtonFilled
                            title='Default'
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
                            Black list
                        </ETASimpleText>
                        <SubCard
                            headTitle=' '
                            message='If you have contact bloked you can see here.'
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
                        Download files
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            If deactivate this option files doesn't download without your permission.
                        </ETASimpleText>
                    </SubtitleText>
                    <MetadaInfoHead>
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
                            Automatically
                        </ETASimpleText>
                        <ETASwitch
                            // onChange={() => { setswitchItem(!switchItem); _setswitchItem(headTitleID)}}
                            onChange={() => null}
                            activated={switchItem}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </MetadaInfoHead>
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
