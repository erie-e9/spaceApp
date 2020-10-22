import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import SectionComponent from '@components/Menu/MenuComponent/SectionsComponent/SectionComponent'

const Root = styled.View`
	flex: 1;
`

const SectionScreen = ({navigation, route}) => {
	const { name } = route?.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
		console.log('SectionScreen params',  route)
	}, [navigation, route])

	return (
		<Root>
			<SectionComponent />
		</Root>
	)
}
export default SectionScreen
