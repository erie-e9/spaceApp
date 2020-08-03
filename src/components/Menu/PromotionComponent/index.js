import React, {useState, useEffect, useContext} from 'react'
import {Platform, Animated, ScrollView, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'
import {useRoute} from '@react-navigation/native'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/promotions/actions'

const HEADER_MIN_HEIGHT = 50
const HEADER_MAX_HEIGHT = 130
const {width} = Dimensions.get('window')

const Root = styled.View`
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CategorytItemsList = styled.FlatList``
const PromoHeadContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${width}px;
	height: 100%;
	padding-bottom: 5px;
`
const PromoHeadTitle = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const PromoHeadImage = styled.ImageBackground`
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const mapStateToProps = (state, props) => {
	const { data } = state.promotions
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

const PromoComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const [ items, setitems ] = useState([])
	const route = useRoute()
	const {selectedItem} = route.params.params
	const [scrollYAnimatedValue] = useState(new Animated.Value(0))
	const [animatedValueTransform] = useState(new Animated.Value(0))
	const [opacity] = useState(new Animated.Value(0))
	let delayValue = 700

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
		getDataRequest()
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

	// const _onPressItem = (item) => {
	//   navigation.navigate('GetOneItemScreen', {
	//     screen: 'MenuScreen',
	//     params: {
	//       _id: item._id,
	//       item: item,
	//     },
	//   });
	// };

	return (
		<Root>
			<ScrollView
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
								Platform.OS === 'ios'
									? '400'
									: '300'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							Empty list
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
								<GeneralItemComponent
									item={item}
								/>
							</Animated.View>
						)
					}}
				/>
			</ScrollView>

			<Animated.View
				style={{
					position: 'absolute',
					top: Platform.OS == 'ios' ? 0 : 0,
					left: 0,
					right: 0,
					alignItems: 'center',
					height: headerHeight,
					width,
					backgroundColor: headerbackgroundColor,
				}}>
				<PromoHeadContainer>
					<PromoHeadImage
						source={{
							uri: selectedItem.image,
						}}>
						<PromoHeadTitle>
							<ETASimpleText
								size={18}
								weight={
									Platform.OS === 'ios'
										? '600'
										: '600'
								}
								// color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
								color={selectedItem.titleColor}
								align='center'
								style={{
									elevation: 4,
									textShadowColor:
										'rgba(0, 0, 0, 0.7)',
									textShadowOffset: {
										width: 0.5,
										height: 0.7,
									},
									textShadowRadius: 3,
								}}>
								{selectedItem.title}
							</ETASimpleText>
							<ETASimpleText
								size={14}
								weight='400'
								color={
									selectedItem.descriptionColor
								}
								align='center'
								style={{
									marginBottom: 5,
									elevation: 4,
									textShadowColor:
										'rgba(0, 0, 0, 0.7)',
									textShadowOffset: {
										width: 0.5,
										height: 0.7,
									},
									textShadowRadius: 3,
								}}>
								{selectedItem.description}
							</ETASimpleText>
						</PromoHeadTitle>
					</PromoHeadImage>
				</PromoHeadContainer>
			</Animated.View>
		</Root>
	)
}

const PromoComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(PromoComponent)
export default PromoComponentConnect
