import React, { useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import {
	AntDesign,
	Entypo,
	Feather,
	MaterialCommunityIcons
} from '@icons'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { connect } from 'react-redux'
import { LOGOUT } from '@redux/user/actions'
import SubCard from './Card'
import { useTranslation } from '@etaui/translate'

const iconSize = 23

const Scroll = styled.ScrollView`
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
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
	const { analytics, manage_accounts, manage_products, reports } = useTranslation()

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
										<AntDesign
											name='barschart'
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
											{analytics.charAt(0).toUpperCase() + analytics.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Know your enterprise with numbers and see how to improve it.'
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
										<MaterialCommunityIcons
											name='account-child-outline'
											size={
												iconSize
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
											{manage_accounts.charAt(0).toUpperCase() + manage_accounts.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Manage clients and employees accounts.'
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
											'AppPreferencesSettingsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<AntDesign
											name='bars'
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
											{manage_products.charAt(0).toUpperCase() + manage_products.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Want to add, remove or update products? this is the place.'
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
											'AppPreferencesSettingsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Entypo
											name='documents'
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
											{reports.charAt(0).toUpperCase() + reports.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Generate and download reports of your enterprise.'
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
