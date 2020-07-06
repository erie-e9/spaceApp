import React, {useState, useEffect} from 'react'
import {Animated} from 'react-native'
import styled from 'styled-components'
import messages from '@utils/messages.json'
import MessageBubbleComponent from './MessageBubbleComponent'

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

const ChatItemComponent = () => {
	const [items] = useState(messages.data) // slice: only first 4 items
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
				{/* <ItemTopContainer>
          <ItemPresentation>
          </ItemPresentation>
        </ItemTopContainer>
        <ItemBottomContainer>
        </ItemBottomContainer> */}
			</BackgroundDoodle>
		</Root>
	)
}

export default ChatItemComponent
