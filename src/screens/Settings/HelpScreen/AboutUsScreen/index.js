import React from 'react'
import styled from 'styled-components/native'
import AboutUsComponent from '@components/Settings/HelpComponent/AboutUsComponent'

const Root = styled.View`
	flex: 1;
`

const AboutUsScreen = () => (
	<Root>
		<AboutUsComponent />
	</Root>
)

export default AboutUsScreen
