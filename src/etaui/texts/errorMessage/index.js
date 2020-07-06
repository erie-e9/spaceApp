import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
	padding-horizontal: 10px;
`

const ETAErrorMessage = ({children, size}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<Root>
				<ETASimpleText
					size={size}
					weight='500'
					color={themeContext.FAIL_COLOR}
					align='left'>
					{children}
				</ETASimpleText>
			</Root>
		</>
	)
}

export default ETAErrorMessage
