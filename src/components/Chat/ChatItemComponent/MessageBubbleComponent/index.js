import React, {useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import Svg, {Path} from 'react-native-svg'
import {moderateScale} from 'react-native-size-matters'

const Root = styled.View`
	flex-direction: row;
`
const Cloud = styled.View`
	max-width: ${moderateScale(250, 2)}px;
	padding-top: ${moderateScale(2, 2)}px;
	padding-bottom: ${moderateScale(3, 2)}px;
	padding-horizontal: ${moderateScale(8, 2)}px;
	border-radius: 15px;
`
const ArrowContainer = styled.View`
	flex: 1;
	justify-content: flex-end;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	z-index: -1;
`
const MessageImage = styled.Image`
	border-radius: 10px;
`
const MessageText = styled.Text`
	padding-top: 3px;
	font-size: 15px;
	font-weight: ${Platform.OS === 'ios' ? 400 : 600};
	line-height: 22px;
`
const MessageTimeText = styled.Text`
	font-size: 11px;
	font-weight: ${Platform.OS === 'ios' ? 400 : 400};
	line-height: 15px;
	align-self: flex-end;
`

const MessageBubbleComponent = ({ item }) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root
			style={{
				alignSelf: item.mine ? 'flex-end' : 'flex-start',
				marginLeft: item.mine ? 0 : 12,
				marginRight: item.mine ? 10 : 0,
				marginVertical: item.mine ? 2 : moderateScale(8, 2),
			}}>
			<Cloud
				style={{
					backgroundColor: item.mine
						? themeContext.PRIMARY_COLOR
						: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
				}}>
				{item.image ? (
					<MessageImage
						style={{
							alignSelf: item.mine
								? 'flex-start'
								: 'flex-end',
						}}
						source={{uri: item.image}}
					/>
				) : null}
				{item.text ? (
					<MessageText
						style={{
							alignItems: item.mine
								? 'flex-end'
								: 'flex-start',
							color: item.mine
								? 'white'
								: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
						}}>
						{item.text}
					</MessageText>
				) : null}
				<MessageTimeText
					style={{
						color: item.mine
							? 'white'
							: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
					}}>12:00 a.m.
				</MessageTimeText>
				<ArrowContainer
					style={{
						alignItems: item.mine
							? 'flex-end'
							: 'flex-start',
					}}>
					<Svg
						style={{
							left: item.mine
								? moderateScale(4, 0.5)
								: -3,
							right: item.mine
								? 0
								: moderateScale(30, 0.5),
						}}
						width={moderateScale(15.5, 0.6)}
						height={moderateScale(17.5, 0.6)}
						viewBox='32.484 17.5 15.515 17.5'
						enable-background='new 32.485 17.5 15.515 17.5'>
						<Path
							d={
								item.mine
									? 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
									: 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
							}
							fill={
								item.mine
									? themeContext.PRIMARY_COLOR
									: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR
							}
							x='0'
							y='0'
						/>
					</Svg>
				</ArrowContainer>
			</Cloud>
		</Root>
	)
}

export default React.memo(MessageBubbleComponent)
