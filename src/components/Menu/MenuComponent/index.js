import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Animated, ScrollView, Dimensions } from 'react-native'
import MenuList from './menuList'
import HeadCategoryList from './HeadCategoryList'
import SectionsComponent from './SectionsComponent'
import StatusComponent from './StatusComponent'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/actions'
import CarouselComponent from './CarouselComponent'
import { useScrollToTop } from '@react-navigation/native'

const HEADER_MIN_HEIGHT = 85
const HEADER_MAX_HEIGHT = 85
const { width } = Dimensions.get('window')

const Root = styled.View`
	justify-content: center;
	align-items: center;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const {data} = state.menu
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const MenuComponent = ({getDataRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const [scrollYAnimatedValue] = useState(new Animated.Value(0))
	const [animatedValueTransform] = useState(new Animated.Value(0.96))
	const [opacity] = useState(new Animated.Value(0))
	const delayValue = 700
	const ref = React.useRef(null)
  	useScrollToTop(ref)

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		
		return () => {
			isUnMounted = true
		}
	}, [data])

	const headerHeight = scrollYAnimatedValue.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp',
	})

	const headerbackgroundColor = scrollYAnimatedValue.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [
			themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
			themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
		],
		// outputRange: [ 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.95)' ],
		extrapolate: 'extend',
	})

	useEffect(() => {
		let isUnMounted = false
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start()
		
		return () => {
			isUnMounted = true
		}
	}, [])

	const translateY = animatedValueTransform.interpolate({
		inputRange: [0, 1],
		outputRange: [delayValue, 1],
		extrapolate: 'clamp',
	})

	return (
		<>
			<Root>
				<ScrollView
					ref={ref}
					contentContainerStyle={{
						paddingTop: HEADER_MAX_HEIGHT,
					}}
					scrollEventThrottle={16}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										y: scrollYAnimatedValue,
									},
								},
							},
						],
						{
							useNativeDriver: !true,
						},
					)}>
					<Animated.View
						style={{
							transform: [{translateY}],
							opacity,
						}}>
						<CarouselComponent
							items={data.menu1}
						/>
						<SectionsComponent />
						<StatusComponent />
					</Animated.View>
					{
						data.length !== 0
						?	<>
								<MenuList
									data={data.menu1}
									title='Dazzler sundaes'
								/>
								<MenuList
									data={data.menu2}
									title='Bars'
								/>
								<MenuList
									data={data.menu3}
									title='Milkshakes'
								/>
								<MenuList
									data={data.menu4}
									title='Smoothies and frappes'
								/>
								<MenuList
									data={data.menu5}
									title='Cookie sandwiches'
								/>
							</>
						:	null
					}
				</ScrollView>

				<Animated.View
					style={{
						position: 'absolute',
						top:
							Platform.OS === 'ios'
								? 0
								: 0,
						left: 0,
						right: 0,
						justifyContent: 'center',
						alignItems: 'center',
						height: headerHeight,
						width,
						backgroundColor: headerbackgroundColor,
					}}>
					<HeadCategoryList />
				</Animated.View>
			</Root>
		</>
	)
}

const MenuComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(MenuComponent)

export default MenuComponentConnect
