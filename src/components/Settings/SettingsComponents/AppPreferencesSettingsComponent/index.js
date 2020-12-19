import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETAThemePicker, ETAButtonFilled } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/settings/notifications/actions'
import { GET_DATA_REQUEST as GET_DATA_REQUEST_LANGUAGES } from '@redux/settings/appsettings/languages/actions'
import { GET_DATA_REQUEST as GET_DATA_REQUEST_CURRENCIES } from '@redux/settings/appsettings/currencies/actions'
import LanguageModal from '@commons/LanguageModal'
import CurrencyModal from '@commons/CurrencyModal'

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 5px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SettingContainer = styled.View`
    min-height: 10px;
    width: 100%;
    justify-content: flex-start;
	flex-direction: column;
	background-color: transparent;
`
const ItemContainer = styled.View`
	padding: 0px 15px;
	background-color: transparent;
`
const SubtitleText = styled.View`
	padding: 5px 0px 5px 5px;
	background-color: transparent;
`
const ButtonModalContainer = styled.View`
	height: 50px;
	width: 100%;
    margin: 5px 0px 0px 0px;
	align-items: center;
	align-self: center;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const datanotifications = state.notifications.data
	const datalanguages = state.languages.data
	const datacurrencies = state.currencies.data

	return { datanotifications, datalanguages, datacurrencies }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
    },
    
	getDataRequestLanguages: () => {
		dispatch({
			type: GET_DATA_REQUEST_LANGUAGES,
		})
    },
    
	getDataRequestCurrencies: () => {
		dispatch({
			type: GET_DATA_REQUEST_CURRENCIES,
		})
	},
})

const AppPreferencesSettingsComponent = ({ getDataRequest, datanotifications, getDataRequestLanguages, datalanguages, getDataRequestCurrencies, datacurrencies }) => {
	const themeContext = useContext(ThemeContext)
	const [ switchItem, setswitchItem ] = useState(true)
    const [ _switchItem, _setswitchItem ] = useState()
	const [ isLanguageModalVisible, setisLanguageModalVisible ] = useState(false)
	const [ isCurrencyModalVisible, setisCurrencyModalVisible ] = useState(false)
    
	useEffect(() => {
        let isUnMounted = false
        getDataRequest()
        getDataRequestLanguages()
        getDataRequestCurrencies()
        console.log('[AppPreferencesSettingsComponent] datanotifications: ', datanotifications);
        console.log('[AppPreferencesSettingsComponent] datalanguages: ', datalanguages);
        console.log('[AppPreferencesSettingsComponent] datacurrencies: ', datacurrencies);
        
		return () => {
			isUnMounted = true
		}
    }, [datanotifications])
    
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
                        Language
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
                            title='English'
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
                        data={datalanguages}
                        onSwipeComplete={() => setisLanguageModalVisible(false)}
                        closeModal={() => setisLanguageModalVisible(false)}
                    />
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
                        Currency
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            Currency that appears by default is dolar, but if you want you could change this option.
                        </ETASimpleText>
                    </SubtitleText>
                    <ButtonModalContainer>
                        <ETAButtonFilled
                            title='$ USD Dolar'
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
                        data={datacurrencies}
                        onSwipeComplete={() => setisCurrencyModalVisible(false)}
                        closeModal={() => setisCurrencyModalVisible(false)}
                    />
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
                        Theme
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            Change the look of the app or let your smartphone theme choose for you.
                        </ETASimpleText>
                    </SubtitleText>
                </ItemContainer>
                <ETAThemePicker 
                    option1Text='System default' 
                    option2Text='Light theme' 
                    option3Text='Dark theme'
                    chosen={0}
                    activated={switchItem}
                    color={
                        themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                    }
                />
            </SettingContainer>
        </Root>
    )
}
    
const AppPreferencesSettingsComponentConnect = connect(
    mapStateToProps,
    mapDispatchProps,
)(AppPreferencesSettingsComponent)

export default React.memo(AppPreferencesSettingsComponentConnect)
