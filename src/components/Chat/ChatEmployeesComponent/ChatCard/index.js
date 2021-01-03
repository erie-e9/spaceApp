import React from 'react'
import styled from 'styled-components/native'
import {ETAAvatar} from '@etaui'
import CardHeader from './cardHeader'
import CardBody from './cardBody'
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
	border-color: ${(props) => props.active ? props.theme.ACTIVE : props.theme.GRAYFACEBOOK};
	border-width: 2px;
	background-color: transparent;
`

const ChatCard = ({ text, unreaded_massages, employee, createdAt, active }) => (
	<Root>
		<AvatarContainer active={active}>
			<ETAAvatar image={employee.avatar ? employee.avatar : variables.AVATAR_USER_DEFAULT} size='middle' />
			{/* <ETAAvatar image={variables.AVATAR_USER_DEFAULT} size='middle' /> */}
		</AvatarContainer>
		<ContactContainer>
			<CardHeader {...employee} createdAt={createdAt} />
			<CardBody text={text} unreaded_massages={unreaded_massages}/>
		</ContactContainer>
	</Root>
)

export default ChatCard
