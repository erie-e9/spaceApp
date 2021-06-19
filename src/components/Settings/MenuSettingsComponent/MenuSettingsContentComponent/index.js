import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import {
	Ionicons,
	EvilIcons,
	AntDesign,
	Feather,
	MaterialIcons,
	Octicons
} from '@icons'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { connect } from 'react-redux'
import { LOGOUT } from '@redux/user/actions'
import SubCard from './Card'
import { useTranslation } from '@etaui/translate'
import AsyncStorage from '@react-native-async-storage/async-storage'

const iconSize = 23

const Scroll = styled.ScrollView``
const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: transparent;
	margin-vertical: 15px;
`
const Card = styled.View`
	flex-direction: row;
	align-items: stretch;
	min-height: 30px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Metadata = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity``
const SettingContainer = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	min-height: 50px;
	padding: 2.5px 10px;
	margin-vertical: 0px;
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

const mapStateToProps = (state) => {
	const {  } = state.user
	return {  }
}

const mapDispatchProps = (dispatch, props) => ({
	logoutUser: () => {
		dispatch({
			type: LOGOUT,
			payload: {},
		})
	},
})

const MenuSettingsContentComponent = ({ logoutUser }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { account,
		account_text,
		admin_tools,
		admin_tools_text,
		settings,
		settings_text,
		help,
		help_text,
		log_out,
		branch_offices,
		branch_offices_text } = useTranslation()

	const logout = () => {
		logoutUser()
		console.log('logged out');
		AsyncStorage.removeItem('@storage_key')
	}

	return (
		<Scroll>
			<Root>
				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'AccountScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<AntDesign
											name='user'
											size={
												iconSize -
												4
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
											{account.charAt(0).toUpperCase() + account.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											// message='Change settings about email, sms or push notifications.'
											message={account_text.charAt(0).toUpperCase() + account_text.slice(1)}
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
						</Touchable>
					</Metadata>
				</Card>

				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'AdminToolsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<MaterialIcons
											name='admin-panel-settings'
											size={
												iconSize -
												1
											}
											color={
												themeContext.PRIMARY_COLOR
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
											{admin_tools.charAt(0).toUpperCase() + admin_tools.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											// message='Change settings about email, sms or push notifications.'
											message={admin_tools_text.charAt(0).toUpperCase() + admin_tools_text.slice(1)}
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
						</Touchable>
					</Metadata>
				</Card>

				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'SettingsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<EvilIcons
											name='gear'
											size={
												iconSize -
												1
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
											{settings.charAt(0).toUpperCase() + settings.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											// message='Change settings about email, sms or push notifications.'
											message={settings_text.charAt(0).toUpperCase() + settings_text.slice(1)}
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
						</Touchable>
					</Metadata>
				</Card>

				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'BranchOfficesScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Octicons
											name='location'
											size={
												iconSize -
												5
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
											{branch_offices.charAt(0).toUpperCase() + branch_offices.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message={branch_offices_text.charAt(0).toUpperCase() + branch_offices_text.slice(1)}
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
						</Touchable>
					</Metadata>
				</Card>

				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'HelpScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Ionicons
											name='ios-information-circle-outline'
											size={
												iconSize -
												3
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											style={{ bottom: 2 }}
										/>
									</IconContainer>
									<OptionTitleContainer>
										<ETASimpleText
											size={13}
											weight={
												Platform.OS ===
												'ios'
													? '400'
													: '300'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											{help.charAt(0).toUpperCase() + help.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message={help_text.charAt(0).toUpperCase() + help_text.slice(1)}
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
						</Touchable>
					</Metadata>
				</Card>

				<Card>
					<Metadata>
						<Touchable onPress={() => logout()}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<AntDesign
											name='logout'
											size={
												iconSize -
												8
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
													: '300'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											{log_out.charAt(0).toUpperCase() + log_out.slice(1)}
										</ETASimpleText>
									</OptionTitleContainer>
								</LeftContainer>
							</SettingContainer>
						</Touchable>
					</Metadata>
				</Card>
			</Root>
		</Scroll>
	)
}

const MenuSettingsContentComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(MenuSettingsContentComponent)

export default MenuSettingsContentComponentConnect
