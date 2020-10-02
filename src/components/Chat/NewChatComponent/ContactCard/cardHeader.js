import React, { useContext } from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import eoLocale from 'date-fns/locale/es';
import { truncateString } from '@functions'
import { useNavigation } from '@react-navigation/native'

const Root = styled.View`
	flex: 0.7;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	padding-horizontal: 10px;
	padding-right: 20px;
	background-color: transparent;
`
const MetaContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-horizontal: 10px;
`
const UserDataContainer = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const CardHeader = ({ username, firstname, lastname }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const fullname = `${firstname} ${lastname}`

	return (
		<Root>
			<MetaContainer>
				<UserDataContainer>
					<ETASimpleText
						size={14}
						weight={
							Platform.OS === 'ios' ? '400' : '800'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='left'>
						{truncateString(fullname, 40)}
					</ETASimpleText>
					<Touchable
						onPress={() => navigation.navigate('ChatItemNavigator', { screen: 'ContactProfileScreen' })}
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
							@{truncateString(username, 40)}
						</ETASimpleText>
					</Touchable>
				</UserDataContainer>
			</MetaContainer>
		</Root>
	)
}

export default CardHeader
