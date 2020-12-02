import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETASwitch, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/profile/notifications/actions'
import LanguageModal from '@commons/LanguageModal'
import CurrencyModal from '@commons/CurrencyModal'

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 5px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SettingContainer = styled.View`
    flex: 0.3;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
	flex-direction: column;
	background-color: transparent;
`
const ItemContainer = styled.View`
    width: 100%;
    margin: 0px 0px 10px 0px;
	padding: 0px 15px;
	background-color: transparent;
`
const SubtitleText = styled.View`
    margin: 10px 0px 0px 0px;
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
		// getDataRequest()
		// console.log('[ChatsSettingsComponent] data: ', data);
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
                        size={15}
                        weight={Platform.OS === 'ios' ? '400' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align='left'
                        style={{ marginTop: 10, marginBottom: 1 }}>
                        Status
                    </ETASimpleText>
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
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='left'>
                            Your friends and contacts will see if you're active or your last connection time, at least you deactivate active status. You cannot see status of your friends if you deactivate it.
                        </ETASimpleText>
                    </SubtitleText>
                </ItemContainer>
            </SettingContainer>
            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={15}
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
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
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
                    <LanguageModal
                        isVisible={isLanguageModalVisible}
                        onSwipeComplete={() => setisLanguageModalVisible(false)}
                        closeModal={() => setisLanguageModalVisible(false)}
                    />
                </ItemContainer>
            </SettingContainer>
            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '400' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align='left'
                        style={{ marginTop: 10, marginBottom: 1 }}>
                        Black list
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='left'>
                            Currency that appears by default is dolar, but if you want you could change this option.
                        </ETASimpleText>
                    </SubtitleText>
                    <ButtonModalContainer>
                        <ETAButtonFilled
                            title='Black list'
                            onPress={() => setisCurrencyModalVisible(true)}
                            disabled={1 === 0 ? true : false}
                            colorButton={
                                themeContext.SECONDARY_BACKGROUND_COLOR
                            }
                            padding={10}
                            width={240}
                            borderRadius={3}
                        />
                    </ButtonModalContainer>
                    <CurrencyModal
                        isVisible={isCurrencyModalVisible}
                        onSwipeComplete={() => setisCurrencyModalVisible(false)}
                        closeModal={() => setisCurrencyModalVisible(false)}
                    />
                </ItemContainer>
            </SettingContainer>
            <SettingContainer>
                <ItemContainer>
                    <ETASimpleText
                        size={15}
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
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
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
