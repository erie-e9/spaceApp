import React from 'react'
import styled from 'styled-components/native'
import ContactUsComponent from '@components/Settings/HelpComponent/ContactUsComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ContactUsScreen = () => (
	<Root>
		<ContactUsComponent />
	</Root>
)

export default ContactUsScreen
