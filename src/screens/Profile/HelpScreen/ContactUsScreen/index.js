import React from 'react'
import styled from 'styled-components/native'
import ContactUsComponent from '@components/Profile/HelpComponent/ContactUsComponent'

const Root = styled.View`
	flex: 1;
`

const ContactUsScreen = () => (
	<Root>
		<ContactUsComponent />
	</Root>
)

export default ContactUsScreen
