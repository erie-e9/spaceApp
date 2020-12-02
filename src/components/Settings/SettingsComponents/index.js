import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import {
	Ionicons,
	EvilIcons,
	FontAwesome,
	AntDesign,
	SimpleLineIcons,
	Feather,
	Octicons,
	MaterialCommunityIcons
} from '@icons'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { connect } from 'react-redux'
import { LOGOUT } from '@redux/user/actions'
import SubCard from './Card'

const iconSize = 23

const Scroll = styled.ScrollView``
const Root = styled.View`
	flex: 1;
	flex-direction: column;
	padding-top: 5px;
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
const Touchable = styled.TouchableWithoutFeedback``
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

const mapStateToProps = () => {
	return {}
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

	const logout = () => {
		logoutUser()
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
											'NotificationsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<FontAwesome
											name='bell-o'
											size={
												iconSize -
												6
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
											Notifications
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Change settings about email, sms or push notifications.'
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
											'ChatsSettingsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Ionicons
											name='chatbox-ellipses-outline'
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
											Chat
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Set chat preferences.'
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

				{/* <Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'NotificationsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Ionicons
											name='language-outline'
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
											Theme, Languages and Currency
										</ETASimpleText>
										<SubCard
											headTitle=' '
											// message='Change settings about email, sms or push notifications.'
											message='Set a default theme, language and currency settings.'
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
				</Card> */}

				<Card>
					<Metadata>
						<Touchable
							onPress={() =>
								navigation.navigate(
									'SettingsNavigator',
									{
										screen:
											'AppPreferencesSettingsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<MaterialCommunityIcons
											name='theme-light-dark'
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
											App preferences
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Set a default theme, language and currency preferences.'
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
			</Root>
		</Scroll>
	)
}

const MenuSettingsContentComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(MenuSettingsContentComponent)

export default MenuSettingsContentComponentConnect
