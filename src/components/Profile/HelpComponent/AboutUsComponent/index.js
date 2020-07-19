import React from 'react'
import styled from 'styled-components/native'
import GeneralHeadComponent from '../GeneralHeadComponent'
import SubHeadAboutUsComponent from './SubHeadAboutUsComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const AboutUsComponent = () => (
	<Root>
		<GeneralHeadComponent
			imagePath={require('@assets/icons/app-icon.png')}
		/>
		<SubHeadAboutUsComponent />
	</Root>
)

export default React.memo(AboutUsComponent)
