import React from 'react'
import styled from 'styled-components/native'
import { ETACreditCard } from '@etaui'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	padding-vertical: 10px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const NewPaymentMethodComponent = () => (
	<Root>
		<ETACreditCard lang='en' />
	</Root>
)

export default NewPaymentMethodComponent
