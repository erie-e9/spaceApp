import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import eoLocale from 'date-fns/locale/es';
import {truncateString} from '@functions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	padding-horizontal: 10px;
	padding-right: 20px;
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
const TimeContainer = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	right: 10px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const CardHeader = ({username, firstname, lastname, createdAt}) => {
	const themeContext = useContext(ThemeContext)
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
					<Touchable>
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
						Member from {createdAt}
					</ETASimpleText>
				</TimeContainer>
			</MetaContainer>
		</Root>
	)
}

export default CardHeader
