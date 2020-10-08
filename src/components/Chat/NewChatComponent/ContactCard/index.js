import React, { useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { ETAAvatar } from '@etaui'
import CardHeader from './cardHeader'
import CardBody from './cardBody'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@icons'

const Root = styled.View`
	flex-direction: row;
	padding-horizontal: 15px;
	shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
	align-items: center;
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const AvatarContainer = styled.View`
	padding: 1.75px;
	border-radius: 50px;
	border-color: ${(props) => props.active ? props.theme.ACTIVE : props.theme.GRAYFACEBOOK};
	border-width: 2px;
	background-color: transparent;
`
const ContactContainer = styled.View`
	flex: 1;
	flex-direction: column;
	min-height: 70px;
	background-color: transparent;
`
const IconContainer = styled.View`
	flex: 0.1;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const ContactCard = ({ item }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<Root>
			<AvatarContainer active={item.active}>
				<ETAAvatar image={item.avatar} size='middle' />
			</AvatarContainer>
			<ContactContainer>
				<CardHeader {...item} />
				<CardBody {...item} />
			</ContactContainer>
			<IconContainer>
				<Feather
					name='chevron-right'
					size={13}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
			</IconContainer>
		</Root>
	)
}

export default ContactCard
