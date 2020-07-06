import React, {useState, useContext, useEffect} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform, Dimensions, Animated} from 'react-native'
import {ETASimpleText} from '@etaui'

const {width} = Dimensions.get('window')
const SPACING_FOR_CARD_INSET = width * 0.1 - 3
const CARD_WIDTH = width * 0.8

const Card = styled.View`
	flex-direction: row;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	margin-horizontal: 8px;
	overflow: hidden;
	height: 100px;
	width: ${(props) => (props.data.length > 1 ? CARD_WIDTH : width - 20)}px;
	padding: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	shadow-color: #333;
	shadow-opacity: 0.5;
	shadow-offset: 10px 10px;
	shadow-radius: 2px;
	elevation: 3;
`
const InfoContainer = styled.View``
const LonelyContainer = styled.View`
	position: absolute;
	bottom: 0px;
`

const UbicationDetailsComponent = ({data}) => {
	const themeContext = useContext(ThemeContext)
	const [items, setitems] = useState([])
	const mapAnimation = new Animated.Value(0)
	// console.log('UbicationDetailsComponent ewe data: ', data);

	useEffect(() => {
		if (Array.isArray(data)) {
			setitems(data)
		} else {
			const objectToArray = new Array(data)

			setitems(objectToArray)
		}

		mapAnimation.addListener(({value}) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3)
			if (index >= data.length) {
				index = data.length - 1
			}
			if (index >= 0) {
				index = 0
			}

			// clearTimeout(regionTimeOut);

			// const regionTimeOut = setTimeout(() => {
			//   if (mapIndex !== index) {
			//     mapIndex = index;
			//     const { co}
			//   }
			// }, 10);
		})
	}, [])

	return (
		<>
			{items.length > 1 ? (
				<Animated.ScrollView
					style={{
						position: 'absolute',
						bottom: Platform.OS === 'ios' ? 0 : 0,
						left: 0,
						right: 0,
					}}
					horizontal
					scrollEventTrottle={1}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					snapToInterval={CARD_WIDTH + 20}
					snapToAlignment='center'
					contentInset={{
						top: 0,
						bottom: 0,
						left: SPACING_FOR_CARD_INSET,
						right: SPACING_FOR_CARD_INSET,
					}}
					contentContainerStyle={{
						paddingHorizontal:
							Platform.OS === 'ios'
								? 0
								: SPACING_FOR_CARD_INSET,
					}}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										x: mapAnimation,
									},
								},
							},
						],
						{
							useNativeDriver: !true,
						},
					)}>
					{items.map((item) => (
						<Card key={item._id} data={data}>
							<InfoContainer>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '700'
											: '800'
									}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
									align='left'>
									{item.title}
								</ETASimpleText>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '300'
											: '200'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									{item.details}
								</ETASimpleText>
							</InfoContainer>
						</Card>
					))}
				</Animated.ScrollView>
			) : (
				<LonelyContainer>
					{items.map((item) => (
						<Card key={item._id} data={data}>
							<InfoContainer>
								<ETASimpleText
									size={13}
									weight={
										Platform.OS ===
										'ios'
											? '700'
											: '800'
									}
									color={
										themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
									}
									align='left'>
									{item.title}
								</ETASimpleText>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '300'
											: '200'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									{item.details}
								</ETASimpleText>
							</InfoContainer>
						</Card>
					))}
				</LonelyContainer>
			)}
		</>
	)
}

export default React.memo(UbicationDetailsComponent)
