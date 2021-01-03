import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Animated, Dimensions, View } from 'react-native'
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
	flexDirection: row;
	position: absolute;
	bottom: 13px;
	width: 100%;
	justifyContent: center;
`
const Touchable = styled.TouchableWithoutFeedback`
	height: 100%;
	width: 100%;
`
const TouchableWithoutFeedbackContainer = styled.View``

const ETACarousel = ({posts, data, autoplay, time,sizeHeight}) => {
	const navigation = useNavigation()
	const [ dataList, setdataList ] = useState([])
	const [ postsLength ] = useState(posts.length)
	const scrollX = new Animated.Value(0)
	const position = Animated.divide(scrollX, width)
	const flatList = useRef(0)
	let timerID
	const [index, setIndex] = useState(0);
	const indexRef = useRef(index);
	indexRef.current = index;
	let scrollValue = 0
	let scrolled = 0
  
	useEffect(() => {
		let isUnMounted = false
		setdataList(carouselData.data)
		if (postsLength) {
			infiniteScroll(dataList)
		} else {
			stopAutoPlay()
		}
		
		return () => {
			isUnMounted = true
		}
	}, [posts])

	const infiniteScroll = () => {
		timerID = setInterval(
			() => {
				scrolled++
				if (scrolled < postsLength) {
					scrollValue = scrollValue + 1
				// console.log(scrollValue)
				} else {
					scrollValue = 0
					scrolled = 0
				}
				
				flatList.current.scrollToIndex({
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
		navigation.navigate('SubMenuNavigator', {
			screen: 'PromotionScreen',
			params: {
				name: ' ',
				selectedItem: selecteditem,
			},
		})
	}

	const onScroll = useCallback((event) => {
		const slideSize = event.nativeEvent.layoutMeasurement.width;
		const index = event.nativeEvent.contentOffset.x / slideSize;
		const roundIndex = Math.round(index);
	
		const distance = Math.abs(roundIndex - index);
	
		// Prevent one pixel triggering setIndex in the middle
		// of the transition. With this we have to scroll a bit
		// more to trigger the index change.
		const isNoMansLand = 0.4 < distance;
	
		if (roundIndex !== indexRef.current && !isNoMansLand) {
		  setIndex(roundIndex);
		  console.log(roundIndex, ' ewe')
		}
	  }, []);

	const flatListOptimizationProps = {
		initialNumToRender: 0,
		maxToRenderPerBatch: 1,
		removeClippedSubviews: true,
		scrollEventThrottle: 16,
		windowSize: 2,
		getItemLayout: useCallback(
		  (_, index) => ({
			index,
			length: width,
			offset: index * width,
		  }),
		  []
		),
	}

	const Pagination = ({ index }) => {
		return (
		  <DotCarousel pointerEvents='none'>
			{posts.map((_, i) => {
			  return (
				<View
				  key={i}
				  style={[
					{
						width: 8,
						height: 8,
						borderRadius: 4,
						marginHorizontal: 2,
						backgroundColor: '#595959'
					},
					index === i
					  ? { opacity: 1 }
					  : { opacity: 0.5 }
				  ]}
				/>
			  );
			})}
		  </DotCarousel>
		);
	}

	return (
		<Root sizeHeight={sizeHeight}>
			{dataList && dataList.length ? (
				<>
					<CarouselList
						ref={flatList}
						data={posts}
						onContentSizeChange={() => flatList?.current?.scrollToItem({ animated: true, item: 0})}
						keyExtractor={(item) => item._id.toString()}
						horizontal
						pagingEnabled
						snapToAlignment='center'
						decelerationRate='fast'
						showsHorizontalScrollIndicator={false}
						bounces={false}
						{...flatListOptimizationProps}
						onScroll={onScroll}
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
					<Pagination index={index}></Pagination>
				</>
			) : null}
		</Root>
	)
}

export default React.memo(ETACarousel)