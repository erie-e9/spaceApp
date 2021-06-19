import React, { useContext } from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import eoLocale from 'date-fns/locale/es';
import { truncateString } from '@functions'
import { useNavigation } from '@react-navigation/native'
import * as RNLocalize from 'react-native-localize'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	margin-left: 4px;
`
const MetaContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
`
const UserDataContainer = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	background-color: transparent;
`
const TimeContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	background-color: transparent;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``

const CardHeader = ({ username, firstname, lastname, createdAt, avatar }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const fullname = `${firstname} ${lastname}`
	let languageCode = RNLocalize.getLocales()

	const _navigationContactProfile = () => {
		navigation.navigate('ChatItemNavigator', { 
			screen: 'ContactProfileScreen',
			params: {
				username,
				firstname,
				lastname,
				createdAt,
				avatar,
			}
		})
	}

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
						{truncateString(fullname, 30)}
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
							@{truncateString(username, 40)}
						</ETASimpleText>
					</Touchable>
				</UserDataContainer>

				<TimeContainer>
					<ETASimpleText
						size={11}
						weight={
							Platform.OS === 'ios' ? '400' : '300'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='left'>
						{formatDistanceToNow(new Date(), {
							addSuffix: true,
							locale: languageCode[0].languageCode === 'en' ? null : eoLocale // Esp
						})}
					</ETASimpleText>
				</TimeContainer>
			</MetaContainer>
		</Root>
	)
}

export default CardHeader
