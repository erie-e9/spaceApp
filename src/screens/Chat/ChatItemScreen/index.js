import React, {useLayoutEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import ChatItemComponent from '@components/Chat/ChatItemComponent'
import { FontAwesome } from '@icons'
import {ETASimpleText, ETAAvatar} from '@etaui'
import {truncateString} from '@functions'

const HeadLeftContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 100;
	background-color: transparent;
`
const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	// hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 100;
	margin: 0px 10px 0px 10px;
	background-color: transparent;
`
const Root = styled.View`
	flex: 1;
`
const HeaderContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
	background-color: transparent;
`
const NameContainer = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``
const AvatarContainer = styled.View`
	height: 37px;
	width: 37px;
	padding: 2px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	border-color: ${(props) => props.active ? props.theme.ACTIVE : props.theme.GRAYFACEBOOK};
	border-width: 2px;
	margin: 5px 10px 0px 0px;
	background-color: transparent;
`

const ChatItemScreen = ({navigation, route}) => {
	const { paramData, user } = route.params
	const themeContext = useContext(ThemeContext)
	const fullname = `${user.firstname} ${user.lastname}`
	// console.log('ChatItemScreen: ', {paramData})

	const _navigationContactProfile = () => {
		navigation.navigate('ChatItemNavigator', { 
			screen: 'ContactProfileScreen',
			params: {
				username: user?.username,
				firstname: user?.firstname,
				lastname: user?.lastname,
				createdAt: paramData?.createdAt,
				avatar: user?.avatar,
			}
		})
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<HeadLeftContainer>
					<HeaderLeft
						onPress={() => navigation.goBack()}>
						<FontAwesome
							name='angle-left'
							size={25}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</HeaderLeft>
					
					<AvatarContainer active={paramData?.active}>
						<ETAAvatar
							image={user.avatar}
							size='small'
						/>
					</AvatarContainer>
				</HeadLeftContainer>
			),
			headerTitle: () => (
				<HeaderContainer>
					<NameContainer>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '400'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{truncateString(fullname, 40)}
						</ETASimpleText>
						<Touchable 
							onPress={() => _navigationContactProfile()}
						>
							<ETASimpleText
								size={11}
								weight={
									Platform.OS === 'ios'
										? '500'
										: '300'
								}
								color={themeContext.LINK}
								align='left'>
								@
								{truncateString(
									user.username,
									30,
								)}
							</ETASimpleText>
						</Touchable>
					</NameContainer>
				</HeaderContainer>
			),
		})
	}, [navigation, route])

	return (
		<Root>
			<ChatItemComponent />
		</Root>
	)
}

export default ChatItemScreen
