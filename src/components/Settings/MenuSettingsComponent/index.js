import React, { useEffect, useContext, memo } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { ETAAvatar, ETASimpleText } from '@etaui'
import { truncateString } from '@functions'
import { fakeavatar } from '@utils/constants'
import PointsHeadComponent from './PointsHeadComponent'
import MenuSettingsContentComponent from './MenuSettingsContentComponent'
import { useTranslation } from '@etaui/translate'
import { connect } from 'react-redux'
import { GET_USER_DATA } from '@redux/user/actions'

const firstname = 'Scarlett'
const lastname = 'Johansson'
const username = 'BWidow'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: transparent
`
const ProfileUserContent = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	background-color: transparent
`
const Scroll = styled.ScrollView`
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Card = styled.View`
	flex-direction: row;
	margin-bottom: 1px;
	min-height: 40px;
	align-items: center;
	padding-horizontal: 10px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const MetadataHeader = styled.View`
	flex-direction: column;
	justify-content: center;
	min-height: 80px;
	margin-horizontal: 10px;
`
const MetadataInfo = styled.View`
	flex-direction: column;
	justify-content: center;
	margin-right: 40px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``

const mapStateToProps = (state, props) => {
	const { userToken, avatar, fullname } = state.user
	return { userToken, avatar, fullname }
}

const mapDispatchProps = (dispatch, props) => ({
	getUserData: () => {
		dispatch({
			type: GET_USER_DATA,
			payload: {},
		})
	},
})

const SettingsComponent = memo(({ getUserData, avatar, fullname }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { member_from } = useTranslation()
	
	useEffect (() => {
		getUserData
	}, [avatar, fullname])

	return (
		<Root>
			<PointsHeadComponent />
			<ProfileUserContent>
				<Touchable
					onPress={() =>
						navigation.navigate('SettingsNavigator', {
							screen: 'ProfileScreen',
						})
					}>
					<Card>
						<ETAAvatar
							image={avatar || fakeavatar}
							size='middle'
						/>
						<MetadataHeader>
							<ETASimpleText
								size={14}
								weight={
									Platform.OS === 'ios'
										? '600'
										: '800'
								}
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								align='left'>
								{
									fullname !== undefined
									?	`${fullname}`
									:	`${firstname} ${lastname}`
								}
								
							</ETASimpleText>
							<MetadataInfo>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '300'
									}
									color={themeContext.LINK}
									align='left'>
									@
									{truncateString(
										username,
										40,
									)}
								</ETASimpleText>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '400'
											: '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									{member_from.charAt(0).toUpperCase() + member_from.slice(1)} 15 jun 2017
								</ETASimpleText>
							</MetadataInfo>
						</MetadataHeader>
					</Card>
				</Touchable>
			</ProfileUserContent>
			<Scroll>
				<MenuSettingsContentComponent />
			</Scroll>
		</Root>
	)
})

// export default SettingsComponent
const SettingsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(SettingsComponent)

export default SettingsComponentConnect
