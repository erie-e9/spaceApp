import React from 'react'
import styled from 'styled-components/native'
import ProfileComponent from '@components/Profile/ProfileComponent'

const Root = styled.View`
	flex: 1;
	background-color: transparent;
`

const ProfileScreen = () => (
	<Root>
		<ProfileComponent />
	</Root>
)

export default ProfileScreen
