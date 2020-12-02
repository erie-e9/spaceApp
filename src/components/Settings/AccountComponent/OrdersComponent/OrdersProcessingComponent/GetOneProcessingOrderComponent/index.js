import React from 'react'
import styled from 'styled-components'
import {useRoute} from '@react-navigation/native'
import HeadGetOneProcessingOrderComponent from './HeadGetOneProcessingOrderComponent'
import SubHeadGetOneProcessingOrderComponent from './SubHeadGetOneProcessingOrderComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
    width: 100%;    
`

const GetOneProcessingOrderComponent = () => {
	const route = useRoute()
    const {item} = route.params
    
    return (
        <Root>
            <HeadGetOneProcessingOrderComponent {...item}/>
            <SubHeadGetOneProcessingOrderComponent items={item.items} />
        </Root>
    )
}

export default GetOneProcessingOrderComponent