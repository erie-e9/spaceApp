import React, {useState, useContext, useRef} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform, Easing, Animated, Dimensions, TextInput} from 'react-native'
import {FontAwesome} from '@icons'
import {ETASimpleText} from '@etaui'
import {variables} from '@utils/constants'

const HeaderSafeArea = styled.SafeAreaView`
	z-index: 600;
`
const Header = styled.View`
	height: 40px;
	padding-horizontal: 10px;
`
const HeaderInner = styled.View`
	flex: 1;
	flex-direction: row;
	overflow: hidden;
	justify-content: space-between;
	align-items: center;
	position: relative;
`
const ImageContainer = styled.View``
// const Img = styled.Image``;
const IconButton = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #e4e6eb;
	width: 32px;
	height: 32px;
	border-radius: 32px;
	margin-horizontal: 5px;
	margin-right: 15px;
`
const IconButtonClose = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	margin-horizontal: 5px;
`
const ContentSafeArea = styled.SafeAreaView`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ContentInner = styled.View`
	flex: 1;
`
const Separator = styled.View`
	height: 1px;
	margin-top: 5px;
	background-color: #e4e6eb;
`
const EmptySearchContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: -50%;
`
const EmptySearchImage = styled.Image`
	width: 50px;
	height: 50px;
	align-self: center;
	margin-vertical: 10px;
`
const Scroll = styled.ScrollView``
const SearchItem = styled.View`
	flex-direction: row;
	height: 40px;
	align-items: center;
	margin-left: 16px;
	padding-horizontal: 15px;
	margin-vertical: 7px;
`

const {timing} = Animated
const {width, height} = Dimensions.get('window')

const ETASearchBar = () => {
	const themeContext = useContext(ThemeContext)
	const input = useRef(null)
	const [isFocused, setisFocused] = useState(!true)
	const [keyword, setkeyword] = useState('')
	const inputBoxTranslateX = new Animated.Value(width)
	const contentTranslateY = new Animated.Value(height)
	const backButtonOpacity = new Animated.Value(0)
	const contentOpacity = new Animated.Value(0)

	const _onFocus = async (event) => {
		event.preventDefault()
		console.log('_onFocused')
		await setisFocused(true)

		const inputBoxTranslateXConfig = {
			duration: 200,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const backButtonOpacityConfig = {
			duration: 200,
			toValue: 1,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const contentTranslateYConfig = {
			duration: 0,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const contentOpacityConfig = {
			duration: 200,
			toValue: 1,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		timing(inputBoxTranslateX, inputBoxTranslateXConfig).start()
		timing(backButtonOpacity, backButtonOpacityConfig).start()
		timing(contentTranslateY, contentTranslateYConfig).start()
		timing(contentOpacity, contentOpacityConfig).start()

		await input.current.focus()
	}

	const _onBlur = async (event) => {
		event.preventDefault()
		console.log('onBlur')
		await setisFocused(!true)

		const inputBoxTranslateXConfig = {
			duration: 200,
			toValue: width,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const backButtonOpacityConfig = {
			duration: 50,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const contentTranslateYConfig = {
			duration: 0,
			toValue: height,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		const contentOpacityConfig = {
			duration: 200,
			toValue: 0,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}

		timing(inputBoxTranslateX, inputBoxTranslateXConfig).start()
		timing(backButtonOpacity, backButtonOpacityConfig).start()
		timing(contentTranslateY, contentTranslateYConfig).start()
		timing(contentOpacity, contentOpacityConfig).start()

		await input.current.blur()
		setkeyword('')
	}

	return (
		<>
			<HeaderSafeArea>
				<Header>
					<HeaderInner>
						<ImageContainer>
							{/* <Img /> */}
						</ImageContainer>
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							onPress={(event) => _onFocus(event)}>
							<FontAwesome
								name='search'
								size={18}
								color='#000'
							/>
						</IconButton>
						<Animated.View
							style={{
								height: 50,
								width,
								flexDirection: 'row',
								alignItems: 'center',
								position: 'absolute',
								top: 0,
								left: 0,
								backgroundColor: 'transparent',
								transform: [
									{
										translateX: inputBoxTranslateX,
									},
								],
								zIndex: 2000,
							}}>
							<Animated.View
								style={{
									opacity: backButtonOpacity,
									backgroundColor: 'blue',
									zIndex: 2000,
								}}>
								<IconButtonClose
									activeOpacity={1}
									underlayColor='#ccd0d5'
									onPress={(event) =>
										_onBlur(event)
									}>
									<FontAwesome
										name='chevron-left'
										size={18}
										color='#000'
										style={{
											zIndex: 2000,
										}}
									/>
								</IconButtonClose>
							</Animated.View>
							<TextInput
								ref={input}
								placeholder={`Search on ${variables.COMPANYNAME}`}
								placeholderTextColor='#333'
								clearButtonMode='always'
								value={keyword}
								onChangeText={(value) =>
									setkeyword(value)
								}
								underlineColorAndroid='transparent'
								style={{
									flex: 1,
									height: 40,
									backgroundColor:
										'#e4e6eb',
									borderRadius: 18,
									paddingHorizontal: 16,
									fontSize: 15,
									marginRight: 15,
									color: '#333',
								}}
							/>
						</Animated.View>
					</HeaderInner>
				</Header>
			</HeaderSafeArea>
			{isFocused ? (
				<Animated.View
					style={{
						width,
						height,
						bottom: 0,
						left: 0,
						zIndex: 999,
						opacity: contentOpacity,
						transform: [
							{
								translateY: contentTranslateY,
							},
						],
					}}>
					<ContentSafeArea>
						<ContentInner>
							<Separator />
							{keyword === '' ? (
								<>
									<EmptySearchContainer>
										<EmptySearchImage
											source={require('@assets/search.png')}
										/>
										<ETASimpleText
											size={14}
											weight={
												Platform.OS ===
												'ios'
													? '500'
													: '300'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='center'>
											Enter a few
											words
											{'\n'}
											to search on{' '}
											{
												variables.COMPANYNAME
											}
										</ETASimpleText>
									</EmptySearchContainer>
								</>
							) : (
								<Scroll>
									<SearchItem>
										<FontAwesome
											name='search'
											size={16}
											color='#ccc'
											style={{
												marginRight: 15,
											}}
										/>
										<ETASimpleText
											size={14}
											weight={
												Platform.OS ===
												'ios'
													? '700'
													: '600'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											Fake result 1
										</ETASimpleText>
									</SearchItem>
									<SearchItem>
										<FontAwesome
											name='search'
											size={16}
											color='#ccc'
											style={{
												marginRight: 15,
											}}
										/>
										<ETASimpleText
											size={14}
											weight={
												Platform.OS ===
												'ios'
													? '700'
													: '600'
											}
											color={
												themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
											}
											align='left'>
											Fake result 2
										</ETASimpleText>
									</SearchItem>
								</Scroll>
							)}
						</ContentInner>
					</ContentSafeArea>
				</Animated.View>
			) : null}
		</>
	)
}

export default ETASearchBar
