import React from 'react'
import styled from 'styled-components/native'
import GeneralHeadComponent from '../GeneralHeadComponent'
import SubHeadContactUsComponent from './SubHeadContactUsComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Scroll = styled.ScrollView`
	flex: 1;
`

const ContactUsComponent = () => (
	<Root>
		<GeneralHeadComponent
			imagePath={require('@assets/icons/app-icon.png')}
		/>
		<Scroll>
			<SubHeadContactUsComponent />
		</Scroll>
	</Root>
)

export default React.memo(ContactUsComponent)
