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
import { useTranslation } from '@etaui/translate'

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
	padding: 0px 15px 5px 15px;
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
	const { language,
        language_text,
        currency,
        currency_text,
        theme,
        theme_text,
        system_default,
        light_theme,
        dark_theme
    } = useTranslation()
    
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
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {language_text.charAt(0).toUpperCase() + language_text.slice(1)}
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
                        {currency.charAt(0).toUpperCase() + currency.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {currency_text.charAt(0).toUpperCase() + currency_text.slice(1)}
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
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </ETASimpleText>
                    <SubtitleText>
                        <ETASimpleText
                            size={11}
                            weight='300'
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align='left'>
                            {theme_text.charAt(0).toUpperCase() + theme_text.slice(1)}
                        </ETASimpleText>
                    </SubtitleText>
                </ItemContainer>
                <ETAThemePicker 
                    option1Text={system_default.charAt(0).toUpperCase() + system_default.slice(1)} 
                    option2Text={light_theme.charAt(0).toUpperCase() + light_theme.slice(1)}
                    option3Text={dark_theme.charAt(0).toUpperCase() + dark_theme.slice(1)}
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
