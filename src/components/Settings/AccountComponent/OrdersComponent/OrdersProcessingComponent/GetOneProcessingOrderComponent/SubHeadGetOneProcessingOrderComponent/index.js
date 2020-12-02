import React from 'react'
import styled from 'styled-components/native'
import ListItemsGetOneProcessingOrderComponent from './ListItemsGetOneProcessingOrderComponent'

const Root = styled.View`
	flex: 1;
`

const SubHeadGetOneProcessingOrderComponent = ({ items }) => (
	<Root>
		<ListItemsGetOneProcessingOrderComponent items={items}/>
	</Root>
)

export default SubHeadGetOneProcessingOrderComponent
