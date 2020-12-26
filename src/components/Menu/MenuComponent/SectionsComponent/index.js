import React, { useContext } from 'react'
import { Platform, Dimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'
import * as RNLocalize from 'react-native-localize'

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
	let languageCode = RNLocalize.getLocales()
	const { arenew, products, hot, weekly, flash, offers } = useTranslation()

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
					onPress={() => _onPress(`${arenew.charAt(0).toUpperCase() + arenew.slice(1)} ${products}`)}
					style={{ backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR }}
					>
					<BannerLeft>
						<ETASimpleText
							size={10}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							{ languageCode[0].languageCode === 'en'
								?	`${arenew.charAt(0).toUpperCase() + arenew.slice(1)} ${products}`
								:	`${arenew.charAt(0).toUpperCase() + arenew.slice(1)} ${products}`
							}
						</ETASimpleText>
						{/* <ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'
							time={2000}>
							{products}
						</ETASimpleText> */}
					</BannerLeft>
				</Touchable>

				<Touchable 
					onPress={() => _onPress(`${hot.charAt(0).toUpperCase() + hot.slice(1)} ${weekly}`)}
					style={{ backgroundColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR }}>
					<BannerRight>
						<ETASimpleText
							size={10}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							{ languageCode[0].languageCode === 'en'
								?	`${hot.charAt(0).toUpperCase() + hot.slice(1)} ${weekly}`
								:	`${hot.charAt(0).toUpperCase() + hot.slice(1)} ${weekly}`
							}
						</ETASimpleText>
						{/* <ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							{weekly}
						</ETASimpleText> */}
					</BannerRight>
				</Touchable>

				<Touchable 
					onPress={() => _onPress(`${
						languageCode[0].languageCode === 'en' 
						? `${flash.charAt(0).toUpperCase() + flash.slice(1)} ${offers}` 
						: `${offers.charAt(0).toUpperCase() + offers.slice(1)} ${flash}`
					}`)}
					style={{ backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR }}
					>
						
					<BannerLeft>
						<ETASimpleText
							size={10}
							weight={
								Platform.OS === 'ios' ? '600' : 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							{ languageCode[0].languageCode === 'en'
								?	`${flash.charAt(0).toUpperCase() + flash.slice(1)} ${offers}`
								:	`${offers.charAt(0).toUpperCase() + offers.slice(1)} ${flash}`
							}
						</ETASimpleText>
						{/* <ETASimpleText
							size={9}
							weight={
								Platform.OS === 'ios' ? '400' : '400'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='center'>
							{offers}
						</ETASimpleText> */}
					</BannerLeft>
				</Touchable>
			</Item>
		</Root>
	)
}

export default React.memo(SectionsComponent)
