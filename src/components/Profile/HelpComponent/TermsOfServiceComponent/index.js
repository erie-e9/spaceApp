import React from 'react'
import styled from 'styled-components/native'
import HeadTermsOfServiceComponent from './HeadTermsOfServiceComponent'
import SubHeadTermsOfServiceComponent from './SubHeadTermsOfServiceComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const TermsOfServiceComponent = () => (
	<Root>
		<HeadTermsOfServiceComponent />
		<SubHeadTermsOfServiceComponent />
	</Root>
)

export default TermsOfServiceComponent
