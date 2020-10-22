import React from 'react'
import styled from 'styled-components/native'
import FAQSComponent from '@components/Settings/HelpComponent/FAQSComponent'

const Root = styled.View`
	flex: 1;
`

const FAQSScreen = () => (
	<Root>
		<FAQSComponent />
	</Root>
)

export default FAQSScreen
