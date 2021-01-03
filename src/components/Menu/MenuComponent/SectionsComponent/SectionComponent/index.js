import React, { useState, useEffect, useContext } from 'react'
import {Animated, Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/sections/actions'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CategorytItemsList = styled.FlatList``

const mapStateToProps = (state, props) => {
	const { data } = state.sections
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {
				_id: 1
			}
		}) 
	}
})

const SectionComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const [ items, setitems ] = useState([])
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	const { list_empty } = useTranslation()
	let delayValue = 700

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setitems(data)
		
		return () => {
			isUnMounted = true
		}
	}, [data])

	useEffect(() => {
		let isUnMounted = false
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start()
		
		return () => {
			isUnMounted = true
		}
	}, [])

	return (
		<Root>
			<CategorytItemsList
				contentContainerStyle={{
					flexDirection: 'column',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				horizontal={!true}
				numColumns={2}
				initialNumToRender={2}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<ETASimpleText
						size={14}
						weight={
							Platform.OS === 'ios' ? '400' : '300'
						}
						color={
							themeContext.PRIMARY_TEXT_COLOR_LIGHT
						}
						align='left'>
						{list_empty.charAt(0).toUpperCase() + list_empty.slice(1)}
					</ETASimpleText>
				)}
				// ListFooterComponent={() => {
				//   return (
				//     <ETASimpleText
				//       size={7}
				//       weight={Platform.OS === 'ios' ? '500' : '300'}
				//       color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
				//       align={'left'}>
				//       Go to up
				//   </ETASimpleText>
				//   );
				// }}
				renderItem={({item}) => {
					delayValue += 700
					const translateY = animatedValueTransform.interpolate(
						{
							inputRange: [0, 1],
							outputRange: [delayValue, 1],
							extrapolate: 'clamp',
						},
					)
					return (
						<Animated.View
							style={{
								opacity,
								transform: [
									{
										translateY,
									},
								],
							}}>
							<GeneralItemComponent item={item} />
						</Animated.View>
					)
				}}
			/>
		</Root>
	)
}

const SectionComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(SectionComponent)

export default SectionComponentConnect
