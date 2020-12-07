import React, { useState, useEffect, useContext } from 'react'
import { Platform, Animated, ScrollView, Dimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETALoader } from '@etaui'
import { useRoute } from '@react-navigation/native'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/promotions/actions'
import { SharedElement } from 'react-navigation-shared-element'

const HEADER_MIN_HEIGHT = 50
const HEADER_MAX_HEIGHT = 130
const {width} = Dimensions.get('window')

const Root = styled.View`
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const PromotionItemsList = styled.FlatList``
const PromoHeadContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	width: ${width}px;
	height: 100%;
	padding: -10px 0px 5px 0px;
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
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
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
	const [ items, setitems ] = useState(null)
	const route = useRoute()
	const { selectedItem } = route?.params;
	const [ scrollYAnimatedValue ] = useState(new Animated.Value(0))
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	let delayValue = 700
	console.log(`PromoComponent promotion.${selectedItem._id}.image`);

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
			duration: 700,
			useNativeDriver: true,
		}).start()
		
		return () => {
			isUnMounted = true
		}
	}, [])

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
				{
					items !== null
					?	<PromotionItemsList
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
					:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
				}
			</ScrollView>

			<Animated.View
				style={{
					position: 'absolute',
					top: Platform.OS == 'ios' ? 0 : 0,
					left: 0,
					right: 0,
					bottom: 10,
					alignItems: 'center',
					height: headerHeight,
					width,
					backgroundColor: headerbackgroundColor,
				}}>
				<PromoHeadContainer>
					<SharedElement 
						id={`promotion.${selectedItem._id}.image`}
						style={{ width: '100%' }}>
						<PromoHeadImage
							source={{
								uri: selectedItem.image,
							}}
						>
							<PromoHeadTitle>
								<SharedElement 
									id={`promotion.${selectedItem._id}.title`}
								>
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
								</SharedElement>
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
					</SharedElement>
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
