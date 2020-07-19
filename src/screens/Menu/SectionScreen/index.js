import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import SectionComponent from '@components/Menu/MenuComponent/SectionsComponent/SectionComponent'

const Root = styled.View`
	flex: 1;
`

const SectionScreen = ({navigation, route}) => {
	const {name} = route.params.params

	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: name})
	}, [navigation, route])

	return (
		<Root>
			<SectionComponent />
		</Root>
	)
}
export default SectionScreen
