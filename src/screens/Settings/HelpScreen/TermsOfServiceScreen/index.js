import React from 'react'
import styled from 'styled-components/native'
import TermsOfServiceComponent from '@components/Settings/HelpComponent/TermsOfServiceComponent'

const Root = styled.View`
	flex: 1;
`

const TermsOfServiceScreen = () => (
	<Root>
		<TermsOfServiceComponent />
	</Root>
)

export default TermsOfServiceScreen
