import React from 'react'
import styled from 'styled-components/native'
// import HowToUseComponent from '@components/Settings/HelpComponent/HowToUseComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const HowToUseScreen = () => (
	<Root>
		{/* <HowToUseComponent /> */}
	</Root>
)

export default HowToUseScreen
