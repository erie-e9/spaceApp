import React, {useState, useEffect, useContext} from 'react'
import {Platform, Animated, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText, ETAHeaderText} from '@etaui'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'

const {width} = Dimensions.get('window')

const Root = styled.View`
  width: ${width - 20}px;
  justify-content: center;
  align-self: center;
  background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  border-radius: 15px
  padding-vertical: 10px;
  margin-bottom: 12px;
`
const HeadContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 10px 7px 5px 5px;
	padding-horizontal: 10px;
`
const ListContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity`
	z-index: 100;
`

const MenuList = ({data, title}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items] = useState(data.slice(0, 2)) // slice: only first 4 items
	const [animatedValueTransform] = useState(new Animated.Value(0))
	const [opacity] = useState(new Animated.Value(0))
	let delayValue = 700

	useEffect(() => {
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 10,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
		}).start()
	}, [])

	const _onPressAllItems = (item) => {
		console.log('_onPressAllItems pressed:', item)

		navigation.navigate('AllItemsScreen', {
			screen: 'MenuScreen',
			params: {
				name: item,
				allitems: data,
			},
		})
	}

	return (
		<>
			{items.length > 0 ? (
				<Root>
					<HeadContainer>
						<ETAHeaderText
							size={14}
							weight='700'
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{title}
						</ETAHeaderText>
						<Touchable
							onPress={() =>
								_onPressAllItems(title)
							}>
							<ETASimpleText
								size={13}
								weight={
									Platform.OS === 'ios'
										? '400'
										: '300'
								}
								color={
									themeContext.PRIMARY_TEXT_COLOR_LIGHT
								}
								align='left'>
								See more
							</ETASimpleText>
						</Touchable>
					</HeadContainer>
					<ListContainer>
						{items.map((item) => {
							delayValue += 700
							const translateY = animatedValueTransform.interpolate(
								{
									inputRange: [0, 1],
									outputRange: [
										delayValue,
										1,
									],
									extrapolate: 'clamp',
								},
							)
							return (
								<Animated.View
									key={item._id}
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
						})}
					</ListContainer>
				</Root>
			) : null}
		</>
	)
}

export default MenuList
