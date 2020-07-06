import React from 'react'
import styled from 'styled-components/native'
import InviteFriendComponent from '@components/Profile/InviteFriendComponent'

const Root = styled.View`
	flex: 1;
`

const InviteFriendScreen = () => (
	<Root>
		<InviteFriendComponent />
	</Root>
)

export default InviteFriendScreen
