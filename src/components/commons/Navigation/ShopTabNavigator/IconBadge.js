import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Ionicons } from '@icons'
import { connect } from 'react-redux'
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

const mapStateToProps = (state) => {
	const { data } = state.cart
	return { data }
}

const IconWithBadge = ({children, name, badgeCount, color, size, data}) => {
	const themeContext = useContext(ThemeContext)
	const [totalItems, settotalItems] = useState(data.length)
	let sum = 0

	useEffect(() => {
		_getsumatory()

		return () => {
			_getsumatory()
		}
	}, [data])

	const _getsumatory = async () => {
		await data.forEach((element) => {
			sum += element.howMany
			settotalItems(sum)
		})
	}

	return (
		<Root>
			{/* <Ionicons name={name} size={size} color={color} /> */}
				{data.length !== 0 && totalItems > 0 ? (
				<BadgeContainer>
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
			) : null}
			{children}
		</Root>
	)
}

const IconWithBadgeConnect = connect(mapStateToProps, null)(IconWithBadge)
export default IconWithBadgeConnect
