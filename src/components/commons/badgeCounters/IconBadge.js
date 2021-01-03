import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components/native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
	z-index: 100;
	background-color: transparent;
`
const BadgeContainer = styled.View`
	position: absolute;
	right: -6px;
	top: -6px;
	min-height: 16px;
	min-width: 16px;
	padding-horizontal: 2px;
	padding-vertical: 1px;
	justify-content: center;
	align-items: center;
	border-width: 0.7px;
	border-radius: 8px;
	z-index: 100;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.REDBADGE};
`

const IconWithBadge = memo(({ children, totalItems }) => {
	return (
		<Root>
			{
				totalItems !== 0
				?	<BadgeContainer>
						<ETASimpleText
							size={8.5}
							weight={
								Platform.OS === 'ios'
									? '600'
									: '600'
							}
							color='white'
							align='left'>
							{totalItems}
						</ETASimpleText>
					</BadgeContainer>
				:	null
			}
			{children}
		</Root>
	)
})

export default IconWithBadge