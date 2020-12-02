import React, { useContext } from 'react'
import { Platform, Dimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'

const {width} = Dimensions.get('window')
const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 0px 0px 8px 0px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Item = styled.View`
	flex-direction: row;
	width: ${width - 25}px;
	height: 32px;
	border-radius: 1px;
	border-width: ${Platform.OS === 'ios' ? 0.5 : 0.75}px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const Touchable = styled.TouchableWithoutFeedback.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const BannerLeft = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const BannerRight = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) =>
		props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`

const SectionsComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	const _onPress = (item) => {
		navigation.navigate('SubMenuNavigator', {
			screen: 'ItemsScreen',
			params: {
				name: item
			},
		})

		// navigation.navigate('SubMenuNavigator', {
		// 	screen: 'ItemsScreen',
		// 	params: {
		// 		name: item,
		// 		items: data,
		// 	},
		// })
	}

	return (
		<Root>
			<Item>
				<Touchable 
					onPress={() => _onPress('New products')}
					style={{ backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR }}
					>
					<BannerLeft>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							New
						</ETASimpleText>
						<ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'
							time={2000}>
							products
						</ETASimpleText>
					</BannerLeft>
				</Touchable>

				<Touchable 
					onPress={() => _onPress('Hot this week')}
					style={{ backgroundColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR }}>
					<BannerRight>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							Hot
						</ETASimpleText>
						<ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							this week
						</ETASimpleText>
					</BannerRight>
				</Touchable>

				<Touchable 
					onPress={() => _onPress('Flash offers')}
					style={{ backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR }}
					>
					<BannerLeft>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							Flash 
						</ETASimpleText>
						<ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							offers
						</ETASimpleText>
					</BannerLeft>
				</Touchable>
			</Item>
		</Root>
	)
}

export default React.memo(SectionsComponent)
