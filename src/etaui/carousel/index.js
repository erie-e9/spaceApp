import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import styled from 'styled-components'
import carouselData from '@utils/carousel.json'
import { useNavigation } from '@react-navigation/native'
import ETACarouselItem from './item'

const {width} = Dimensions.get('window')

const Root = styled.View`
	min-height: ${props => props.sizeHeight + 10}px;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CarouselList = styled.FlatList``
const DotCarousel = styled.View`
	flex-direction: row;
	justify-content: center;
	position: absolute;
	bottom: 5px;
`
const Touchable = styled.TouchableWithoutFeedback`
	height: 100%;
	width: 100%;
`
const TouchableWithoutFeedbackContainer = styled.View``

const ETACarousel = ({posts, data, autoplay, time,sizeHeight}) => {
	const navigation = useNavigation()
	const [dataList, setdataList] = useState([])
	const [postsLenght] = useState(posts.length)
	const scrollX = new Animated.Value(0)
	const position = Animated.divide(scrollX, width)
	const flatList = useRef(0)
	let timerID

	useEffect(() => {
		setdataList(carouselData.data)
		if (postsLenght) {
			infiniteScroll(dataList)
		} else {
			stopAutoPlay()
		}
	}, [posts])

	const infiniteScroll = () => {
		let scrollValue = 0
		let scrolled = 0

		timerID = setInterval(
			() => {
				scrolled++
				if (scrolled < postsLenght) {
					scrollValue = scrollValue + 1
				} else {
					scrollValue = 0
					scrolled = 0
				}

				flatList.current?.scrollToIndex({
					animated: true,
					index: scrollValue ? scrollValue : 0,
				})
			},
			time ? time : 3000,
		)
	}

	const stopAutoPlay = () => {
		if (timerID) {
			clearInterval(timerID)
			timerID = null
		}
	}

	const _onPressPromo = (selecteditem) => {
		console.log('selecteditem ', selecteditem)
		navigation.navigate('SubMenuNavigator', {
			screen: 'PromotionScreen',
			params: {
				name: selecteditem.title,
				selectedItem: selecteditem,
			},
		})
	}

	return (
		<Root sizeHeight={sizeHeight}>
			{dataList && dataList.length ? (
				<>
					<CarouselList
						ref={flatList}
						data={posts}
						keyExtractor={(item) => item._id.toString()}
						horizontal
						pagingEnabled
						snapToAlignment='center'
						scrollEventThrottle={16}
						decelerationRate='fast'
						showsHorizontalScrollIndicator={false}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {
											x: scrollX,
										},
									},
								},
							],
							{
								useNativeDriver: !true,
								// isInteraction: false
							},
						)}
						renderItem={({item}) => (
							<Touchable
								onPress={() =>
									_onPressPromo(item)
								}>
								<TouchableWithoutFeedbackContainer>
									<ETACarouselItem
										key={item._id}
										item={item}
										sizeHeight={sizeHeight}
									/>
								</TouchableWithoutFeedbackContainer>
							</Touchable>
						)}
					/>
					<DotCarousel>
						{dataList.map((_, i) => {
							const opacity = position.interpolate({
								inputRange: [i - 1, i, i + 1],
								outputRange: [0.3, 1, 0.3],
								extrapolate: 'clamp',
							})

							return (
								<Animated.View
									key={i}
									style={{
										opacity,
										width: 7,
										height: 7,
										borderRadius: 3.5,
										backgroundColor:
											'#595959',
										margin: 5,
										bottom: 5,
									}}
								/>
							)
						})}
					</DotCarousel>
				</>
			) : null}
		</Root>
	)
}

export default React.memo(ETACarousel)