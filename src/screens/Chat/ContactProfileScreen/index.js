import React from 'react'
import styled from 'styled-components/native'
import ContactProfileComponent from '@components/Chat/ContactProfileComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ContactProfileScreen = () => (
	<Root>
		<ContactProfileComponent />
	</Root>
)

export default ContactProfileScreen
