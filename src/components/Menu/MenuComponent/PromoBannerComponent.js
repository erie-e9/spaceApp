import React, {useContext} from 'react'
import {Platform, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'

const {width} = Dimensions.get('window')
const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	padding: 10px 0px;
	margin-bottom: 10px;
`
const Item = styled.View`
	flex-direction: row;
	width: ${width - 50}px;
	height: 35px;
	border-radius: 1px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
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

const PromoBannerComponent = () => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
			<Item>
				<BannerLeft>
					<ETASimpleText
						size={10}
						weight={
							Platform.OS === 'ios' ? '700' : 'bold'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						Offers
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
						of the week
					</ETASimpleText>
				</BannerLeft>
				<BannerRight>
					<ETASimpleText
						size={10}
						weight={
							Platform.OS === 'ios' ? '700' : 'bold'
						}
						color={
							themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						Extra discount
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
						Code: JUN50
					</ETASimpleText>
				</BannerRight>
				<BannerLeft>
					<ETASimpleText
						size={10}
						weight={
							Platform.OS === 'ios' ? '700' : 'bold'
						}
						color={
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
						}
						align='center'>
						Free shipping
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
						First order
					</ETASimpleText>
				</BannerLeft>
			</Item>
		</Root>
	)
}

export default React.memo(PromoBannerComponent)
