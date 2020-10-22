import React from 'react'
import styled from 'styled-components/native'
import HeadProfileComponent from './HeadProfileComponent'
import SubHeadProfileComponent from './SubHeadProfileComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const ProfileComponent = () => (
	<Root>
		<HeadProfileComponent />
		<SubHeadProfileComponent />
	</Root>
)

export default ProfileComponent
