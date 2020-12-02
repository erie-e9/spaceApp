import React from 'react'
import styled from 'styled-components/native'
import { ETAAvatar } from '@etaui'
import CardHeader from './cardHeader'
import CardBody from './cardBody'
import { SharedElement } from 'react-navigation-shared-element'
import { variables } from '@utils/constants'

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
const ContactContainer = styled.View`
	flex-direction: column;
	min-height: 70px;
	width: 100%;
	min-width: 100%;
	max-width: 100%;
`
const AvatarContainer = styled.View`
	padding: 1.75px;
	border-radius: 50px;
	border-width: 2px;
	border-color: ${(props) => props.active ? props.theme.ACTIVE : props.theme.GRAYFACEBOOK};
	background-color: transparent;
`

const ChatCard = ({ text, client, createdAt, active }) => (
	<Root>
		<AvatarContainer active={active}>
			<SharedElement id={`chat.1.avatar`}>
				{/* <ETAAvatar image={client.avatar ? client.avatar : variables.AVATAR_USER_DEFAULT} size='middle' /> */}
				<ETAAvatar image={variables.AVATAR_USER_DEFAULT} size='middle' />
			</SharedElement>
		</AvatarContainer>
		<ContactContainer>
			<CardHeader {...client} createdAt={createdAt} />
			<CardBody text={text} />
		</ContactContainer>
	</Root>
)

export default ChatCard
