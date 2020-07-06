import React from 'react'
import styled from 'styled-components/native'
import AccountComponent from '@components/Profile/AccountComponent'

const Root = styled.View`
	flex: 1;
`

const AccountScreen = () => (
	<Root>
		<AccountComponent />
	</Root>
)

export default AccountScreen
