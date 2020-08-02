import React, {useState, useEffect, useContext} from 'react'
import {View, Text} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {Ionicons} from '@icons'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
	const {data} = state.cart
	return {data}
}

const IconWithBadge = ({name, badgeCount, color, size, data}) => {
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
		<View style={{width: 24, height: 24, margin: 5}}>
			<Ionicons name={name} size={size} color={color} />
			{data.length !== 0 && totalItems > 0 ? (
				<View
					style={{
						position: 'absolute',
						right: -6,
						top: -3,
						backgroundColor: themeContext.REDBADGE,
						minHeight: 16,
						minWidth: 16,
						paddingHorizontal: 2,
						paddingVertical: 1,
						justifyContent: 'center',
						alignItems: 'center',
						borderWidth: 0.7,
						borderRadius: 8,
						borderColor:
							themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
					}}>
					<Text
						style={{
							color: 'white',
							fontSize: 8.5,
							fontWeight: '600',
						}}>
						{totalItems}
					</Text>
				</View>
			) : null}
		</View>
	)
}

const IconWithBadgeConnect = connect(mapStateToProps, null)(IconWithBadge)

export default IconWithBadgeConnect
