import React from 'react'
import styled from 'styled-components/native'
import ListItemsGetOnePreviousOrderComponent from './ListItemsGetOnePreviousOrderComponent'

const Root = styled.View`
	flex: 1;
`

const SubHeadGetOnePreviousOrderComponent = ({ items }) => (
	<Root>
		<ListItemsGetOnePreviousOrderComponent items={items}/>
	</Root>
)

export default SubHeadGetOnePreviousOrderComponent
