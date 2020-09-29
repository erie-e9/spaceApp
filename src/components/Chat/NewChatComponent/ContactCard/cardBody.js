import React, { useContext } from 'react'
import { Dimensions, Linking } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons, Octicons, Entypo } from '@icons'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-content: center;
	padding-horizontal: 10px;
	padding-right: 20px;
	border-bottom-width: 0px;
	border-bottom-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`
const SubHeadContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
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

const CardBody = ({ username, firstname, lastname, active, avatar, cellphone }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<Root>
			<SubHeadContainer>
				<ButtonContainer 
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
				</ButtonContainer>
			</SubHeadContainer>
		</Root>
	)
}

export default CardBody
