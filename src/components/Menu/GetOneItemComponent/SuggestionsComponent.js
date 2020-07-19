import React, {useState, useEffect, useContext, memo} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Dimensions, Animated, Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/menu/similarto/actions'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	z-index: 999;
	background-color: transparent;
`
const SuggestionItemsContainer = styled.View`
	flex-direction: column;
	height: 90px;
	width: ${width}px;
	justify-content: center;
	position: absolute;
	align-items: flex-start;
	z-index: 10;
	background-color: transparent;
`
const SuggestionItemsList = styled.FlatList`
	width: ${width}px;
`
const Touchable = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`
const SuggestionItem = styled.View`
	width: 50px;
	height: 50px;
	border-radius: 10px;
	border-width: 0px;
	border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin: 2px 7px;
	justify-content: center;
	align-items: center;
`
const SuggestionItemImage = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 10px;
`
const mapStateToProps = (state, props) => {
	const {data} = state.similarto
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
			payload: {
				_id: 1
			}
		})
	}
})

const SuggestionsComponent = ({selectedItemName, getAllItemsRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const [items, setitems] = useState([])
	const [animatedValueTransform] = useState(new Animated.Value(0.9))
	let delayValue = 1000

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
	}, [])

	const translateY = animatedValueTransform.interpolate({
		inputRange: [0, 1],
		outputRange: [delayValue, 1],
	})

	return (
		<Root>
			<SuggestionItemsContainer>
				{items && items.length > 0 ? (
					<>
						<Animated.View
							style={{
								left: 10,
								transform: [
									{
										translateY,
									},
								],
							}}>
							<ETASimpleText
								size={12}
								weight={
									Platform.OS === 'ios'
										? '400'
										: '500'
								}
								// color='white'
								color={
									themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								}
								align='center'>
								Similar to {selectedItemName}
							</ETASimpleText>
						</Animated.View>
						<SuggestionItemsList
							data={items}
							keyExtractor={(item) =>
								item._id.toString()
							}
							horizontal
							snapToAlignment='center'
							scrollEventThrottle={16}
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
										extrapolate:
											'clamp',
									},
								)
								return (
									<Touchable
										key={item._id}
										onPress={() =>
											console.log(
												'ñeñe ñeñe ñeñe',
											)
										}>
										<Animated.View
											style={{
												transform: [
													{
														translateX,
													},
												],
											}}>
											<SuggestionItem>
												<SuggestionItemImage
													source={{
														uri:
															item
																.images[0]
																.image,
													}}
												/>
											</SuggestionItem>
											{/* <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : '200'}
                        // color='white'
                        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        align={'center'}>
                        {item.name}
                      </ETASimpleText> */}
										</Animated.View>
									</Touchable>
								)
							}}
						/>
					</>
				) : null}
			</SuggestionItemsContainer>
		</Root>
	)
}


const SuggestionsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(SuggestionsComponent)


export default memo(SuggestionsComponentConnect)
