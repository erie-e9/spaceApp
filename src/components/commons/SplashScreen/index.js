import React from 'react'
import {StatusBar, Platform} from 'react-native'
import styled from 'styled-components/native'

const logoSize = 90

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
`
const Logo = styled.Image`
	width: ${Platform.OS === 'ios' ? logoSize : 90}px;
	height: ${Platform.OS === 'ios' ? logoSize : 90}px;
`

const SplashScreen = () => (
	<Root>
		<StatusBar hidden />
		<Logo source={require('@assets/icons/app-icon.png')} />
	</Root>
)

export default SplashScreen
