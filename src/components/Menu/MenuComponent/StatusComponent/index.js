import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import StatusItem from './item'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/status/actions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	min-height: 60px;
	width: ${width}px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-vertical: 4px;
	margin: 3px 0px 4px 0px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemsList = styled.FlatList`
	width: ${width}px;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	justify-content: center;
	align-items: center;
`

const mapStateToProps = (state) => {
	const { data } = state.status
	return { data }
}

const mapDispatchProps = (dispatch) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			dispatch: {},
		})
	},
})

const Status = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ items, setitems ] = useState([])
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	let delayValue = 1000

	useEffect(() => {
		getDataRequest()
		setitems(data)
		// setitems(data.slice(0, 11), [])
		// setsubitems(data.slice(3, 11), [])
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()
	}, [data])

	const _onPressItem = (item) => {
		navigation.navigate('SubMenuNavigator', {
			screen: 'ItemsScreen',
			params: {
				name: item.title
			},
		})
	}

	return (
		<Root>
			{items && items.length > 0 ? (
				<>
					<ItemsList
						data={items}
						keyExtractor={(item) => item._id.toString()}
						horizontal
						snapToAlignment='center'
						scrollEventThrottle={16}								
						snapToInterval={50}
						decelerationRate='fast'
						showsHorizontalScrollIndicator={false}
						renderItem={({item}) => {
							delayValue += 1000
							const translateX = animatedValueTransform.interpolate(
								{
									inputRange: [0, 1],
									outputRange: [
										delayValue,
										1,
									],
								},
							)
							return (
								<Touchable
									key={item._id}
									onPress={() =>
										_onPressItem(item)
									}>
									<Animated.View
										style={{
											transform: [
												{
													translateX,
												},
											],
										}}>
										<StatusItem
											item={item}
										/>
									</Animated.View>
								</Touchable>
							)
						}}
					/>
				</>
			) : null}
		</Root>
	)
}

const StatusConnect = connect(
mapStateToProps,
mapDispatchProps)(Status)

export default StatusConnect
