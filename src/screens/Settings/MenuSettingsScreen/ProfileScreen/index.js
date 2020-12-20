import React from 'react'
import styled from 'styled-components/native'
import ProfileComponent from '@components/Settings/MenuSettingsComponent/ProfileComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const ProfileScreen = () => (
	<Root>
		<ProfileComponent />
	</Root>
)

export default ProfileScreen
