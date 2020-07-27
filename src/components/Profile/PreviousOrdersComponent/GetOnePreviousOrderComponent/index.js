import React from 'react'
import styled from 'styled-components'
import {useRoute} from '@react-navigation/native'
import HeadGetOnePreviousOrderComponent from './HeadGetOnePreviousOrderComponent'
import SubHeadGetOnePreviousOrderComponent from './SubHeadGetOnePreviousOrderComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
    width: 100%;    
`

const GetOnePreviousOrderComponent = () => {
	const route = useRoute()
    const {item} = route.params
    
    return (
        <Root>
            <HeadGetOnePreviousOrderComponent {...item}/>
            <SubHeadGetOnePreviousOrderComponent items={item.items} />
        </Root>
    )
}

export default GetOnePreviousOrderComponent