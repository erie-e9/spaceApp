import React from 'react'
import styled from 'styled-components/native'
import ContactProfileComponent from '@components/Chat/ContactProfileComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const ContactProfileScreen = () => (
	<Root>
		<ContactProfileComponent />
	</Root>
)

export default ContactProfileScreen
