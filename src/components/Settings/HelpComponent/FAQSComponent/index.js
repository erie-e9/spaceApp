import React from 'react'
import styled from 'styled-components/native'
import QuestionsList from './QuestionsList'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	padding-top: 5px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const FAQSComponent = () => (
	<Root>
		<QuestionsList />
	</Root>
)

export default React.memo(FAQSComponent)
