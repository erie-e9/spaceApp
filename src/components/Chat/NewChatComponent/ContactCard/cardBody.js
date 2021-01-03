import React, { useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	flex-direction: column;
	justify-content: center;
	align-content: center;
	padding: 0px 20px;
	border-bottom-width: 0px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const SubHeadContainer = styled.View`
	flex: 0.7;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-right: 20px;
	background-color: transparent;
` 
const ButtonContainer = styled.TouchableOpacity`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
	margin-horizontal: 4px;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`
const TimeContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`


const CardBody = memo(({ username, firstname, lastname, active, avatar, cellphone, createdAt }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { member_from } = useTranslation()

	return (
		<Root>
			<SubHeadContainer>
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
						{member_from.charAt(0).toUpperCase() + member_from.slice(1)} {createdAt}
					</ETASimpleText>
				</TimeContainer>
			{/* 	<ButtonContainer 
					onPress={() => navigation.navigate('ChatItemNavigator', { screen: 'ChatItemScreen', params: {item: { active, employee: { avatar, firstname, lastname, username } }} })}
				>
					<Ionicons name='chatbubble-ellipses-sharp' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
				</ButtonContainer>
				
				<ButtonContainer 
					onPress={() => Linking.openURL(`tel:${cellphone}`).catch((err) => console.error('An error occurred opening link on contact card: ', err))}
				>
					<Entypo name='phone' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
				</ButtonContainer>

				<ButtonContainer 
					onPress={() => console.log('test')}
				>
					<Entypo name='info-with-circle' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
				</ButtonContainer> */}
			</SubHeadContainer> 
		</Root>
	)
})

export default CardBody
