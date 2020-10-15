import React from 'react'
import styled from 'styled-components/native'
import { useRoute } from '@react-navigation/native'
import ProfileHeadComponent from './ProfileHead'
import ProfileSubHeadComponent from './ProfileSubHead'
import ProfileBodyComponent from './ProfileBody'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const ContactProfileComponent = () => {
	const route = useRoute()
    const { params } = route

    return (
        <Root>
            <ProfileHeadComponent {...params}/>
            <ProfileSubHeadComponent {...params}/>
            <ProfileBodyComponent {...params}/>
        </Root>
    )
}

export default ContactProfileComponent
