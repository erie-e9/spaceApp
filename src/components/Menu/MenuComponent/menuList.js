import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Animated, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText, ETAHeaderText } from '@etaui'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import { AntDesign } from '@icons'

const {width} = Dimensions.get('window')

const Root = styled.View`
	width: ${width - 20}px;
	justify-content: center;
	align-self: center;
	border-radius: 15px
	padding-vertical: 5px;
	margin-bottom: 7px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const HeadContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 7px 7px 5px 5px;
	padding-horizontal: 10px;
	background-color: transparent
`
const ListContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 100;
`

const MenuList = ({ data, title }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const items = React.useMemo(() => data.slice(0, 2), []) // slice: only first 2 items
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
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

	// const _onPressAllItems = (item) => {
	// 	navigation.navigate('SubMenuNavigator', {
	// 		screen: 'AllItemsScreen',
	// 		params: {
	// 			name: item,
	// 			allitems: data,
	// 		},
	// 	})
	// }

	const _onPressAllItems = (item) => {
		navigation.navigate('SubMenuNavigator', {
			screen: 'ItemsScreen',
			params: {
				name: item
			},
		})
	}

	return (
		<>
			{items.length > 0 ? (
				<Root>
					<HeadContainer>
						<ETAHeaderText
							size={15}
							weight='600'
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
							<AntDesign name='bars' size={12} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} style={{ paddingHorizontal: 5 }} />
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
								See all
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
