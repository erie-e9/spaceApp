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
	const { addresses, payment_methods, favorites, orders, branch_offices } = useTranslation()

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
											'AddressesScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<SimpleLineIcons
											name='directions'
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
											{addresses.charAt(0).toUpperCase() + addresses.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Set your address where we can send you our products.'
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
											'PaymentMethodsScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<AntDesign
											name='creditcard'
											size={
												iconSize -
												7
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
													: '800'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											{payment_methods.charAt(0).toUpperCase() + payment_methods.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='Define your online payment methods.'
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
											'FavoritesScreen',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<Ionicons
											name='md-heart-outline'
											size={20}
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
											{favorites.charAt(0).toUpperCase() + favorites.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='All your favorite items.'
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
											'TopNavigatorOrders',
									},
								)
							}>
							<SettingContainer>
								<LeftContainer>
									<IconContainer>
										<MaterialCommunityIcons
											name='page-previous-outline'
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
											{orders.charAt(0).toUpperCase() + orders.slice(1)}
										</ETASimpleText>
										<SubCard
											headTitle=' '
											message='See your previous order here.'
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
											message='All the plase where you can find our products.'
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
