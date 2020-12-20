import React from 'react'
import styled from 'styled-components/native'
import AccountComponent from '@components/Settings/AccountComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const AccountScreen = () => (
	<Root>
		<AccountComponent />
	</Root>
)

export default AccountScreen
