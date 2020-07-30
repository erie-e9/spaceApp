import React, {useState, useEffect} from 'react'
import {Animated} from 'react-native'
import styled from 'styled-components'
import {useNavigation} from '@react-navigation/native'
import CategoryItemComponent from './CategoryItemComponent'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/menu/categories/actions'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CategoryList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``

const mapStateToProps = (state) => {
	const {data} = state.categories
	return {data}
}

const mapDispatchProps = (dispatch) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
			dispatch: {},
		})
	},
})

const CategoryListComponent = ({getAllItemsRequest, data}) => {
	const navigation = useNavigation()
	const [ items, setitems ] = useState([])
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	let delayValue = 700

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
	}, [data])

	useEffect(() => {
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 700,
			useNativeDriver: true,
		}).start()
	}, [])

	const _onPressCategory = (item) => {
		navigation.navigate('CategoryItemsScreen', {
			screen: 'MenuScreen',
			params: {
				category: item.name
			},
		})
	}

	return (
		<Root>
			<CategoryList
				data={items}
				keyExtractor={(item) => item._id.toString()}
				snapToAlignment='center'
				scrollEventThrottle={16}
				decelerationRate='fast'
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				initialNumToRender={6}
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
						<Touchable
							key={item._id}
							onPress={() =>
								_onPressCategory(item)
							}>
							<Animated.View
								style={{
									opacity,
									transform: [
										{
											translateY,
										},
									],
								}}>
								<CategoryItemComponent
									item={item}
								/>
							</Animated.View>
						</Touchable>
					)
				}}
			/>
		</Root>
	)
}

const CategoryListComponentConnect = connect(
mapStateToProps,
mapDispatchProps)(CategoryListComponent)

export default CategoryListComponentConnect
