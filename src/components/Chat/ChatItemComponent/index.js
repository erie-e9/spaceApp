import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Dimensions, Animated} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import messages from '@utils/messages.json'
import MessageBubbleComponent from './MessageBubbleComponent'
import ChatInputComponent from './ChatInputComponent'
import { MaterialCommunityIcons, MaterialIcons, Octicons, Entypo } from '@icons'

const HEADER_MIN_HEIGHT = 50
const HEADER_MAX_HEIGHT = 50
const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
`
const BackgroundDoodle = styled.ImageBackground`
	flex: 1;
	width: null;
	height: null;
	resize-mode: cover;
	justify-content: center;
`
const MessagesList = styled.FlatList``
const SubHeadContainer = styled.View`
	width: ${width}px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 4px 50px;
	background-color: transparent;
` 
const ButtonContainer = styled.TouchableOpacity`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`

const ChatItemComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items] = useState(messages.data)
	const [scrollYAnimatedValue] = useState(new Animated.Value(0))
	const [animatedValueTransform] = useState(new Animated.Value(0.9))
	const [opacity] = useState(new Animated.Value(0))
	let delayValue = 2000

	useEffect(() => {
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 0,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}, [])

	const headerHeight = scrollYAnimatedValue.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp',
	})

	const headerbackgroundColor = scrollYAnimatedValue.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [
			themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
			themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
		],
		// outputRange: [ 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.95)' ],
		extrapolate: 'extend',
	})

	return (
		<Root>
			<BackgroundDoodle
				source={{
					uri:
						'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png',
				}}>
				<MessagesList
					contentContainerStyle={{
						flexDirection: 'column',
						paddingTop: HEADER_MAX_HEIGHT,
					}}
					data={items}
					keyExtractor={(item) => item._id.toString()}
					horizontal={!true}
					initialNumToRender={4}
					showsHorizontalScrollIndicator={!true}
					showsVerticalScrollIndicator
					renderItem={({item}) => {
						delayValue += 1000
						const translateY = animatedValueTransform.interpolate(
							{
								inputRange: [0, 1],
								outputRange: [delayValue, 1],
								extrapolate: 'clamp',
							},
						)

						return (
							// <Touchable key={item._id} onPress={() => _onPressItem(item)}>
							<Animated.View
								style={{
									opacity,
									// transform: [{ translateY }]
								}}>
								<MessageBubbleComponent
									item={item}
								/>
							</Animated.View>
							// {/* </Touchable> */}
						)
					}}
				/>
				<Animated.View
					style={{
						position: 'absolute',
						top:
							Platform.OS === 'ios'
								? 0
								: 0,
						left: 0,
						right: 0,
						justifyContent: 'center',
						alignItems: 'flex-start',
						height: headerHeight,
						width,
						backgroundColor: headerbackgroundColor,
					}}>
					<SubHeadContainer>
						<ButtonContainer 
							onPress={() => navigation.navigate('Chats', { screen: 'NewChatScreen'})}
						>
							<Entypo name='phone' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
						</ButtonContainer>

						<ButtonContainer 
							onPress={() => console.log('test')}
						>
							<Octicons name='broadcast' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
						</ButtonContainer>

						<ButtonContainer 
							onPress={() => console.log('test')}
						>
							<Entypo name='info-with-circle' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
						</ButtonContainer>
					</SubHeadContainer>
				</Animated.View>
				<ChatInputComponent/>
			</BackgroundDoodle>
		</Root>
	)
}

export default ChatItemComponent
