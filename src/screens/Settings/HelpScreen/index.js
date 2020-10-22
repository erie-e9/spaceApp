import React from 'react'
import styled from 'styled-components/native'
import HelpComponent from '@components/Settings/HelpComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const HelpScreen = () => (
	<Root>
		<HelpComponent />
	</Root>
)

export default HelpScreen
