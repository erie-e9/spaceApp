import React, {useState, useEffect, useContext } from 'react'
import styled, {ThemeContext } from 'styled-components/native'
import { Dimensions, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ChatCard from './ChatCard'
import { ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/chats/actions'
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@icons'

const HEADER_MIN_HEIGHT = 50
const HEADER_MAX_HEIGHT = 50
const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const ChatsFlatList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})``
const SubHeadContainer = styled.View`
	width: ${width}px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 4px 90px;
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

const mapStateToProps = (state, props) => {
	const {data} = state.chats
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const ChatComponent = ({getDataRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [scrollYAnimatedValue] = useState(new Animated.Value(0))

	useEffect(() => {
		getDataRequest()
		setitems(data)
	}, [data])
	
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

	const _onPress = (item) => {
		navigation.navigate('ChatItemNavigator', {
			screen: 'ChatItemScreen',
			params: {
				paramData: item
			},
		})
	}

	const _onPressNewChat = (item) => {
		navigation.navigate('NewChatNavigator', {
			screen: 'NewChatScreen'
		})
	}

	return (
		<Root>
			{
				items
				?	<>
						<ChatsFlatList
							contentContainerStyle={{
								alignSelf: 'stretch',
								paddingTop: HEADER_MAX_HEIGHT,
							}}
							data={items}
							keyExtractor={(item) => item._id.toString()}
							showsVerticalScrollIndicator={false}
							renderItem={({item}) => (
								<Touchable
									key={item._id}
									onPress={() => _onPress(item)}>
									<ChatCard {...item} />
								</Touchable>
							)}
						/>

						<Animated.View
							style={{
								position: 'absolute',
								top:
									Platform.OS === 'ios'
										? 0
										: 0,
								// left: 0,
								// right: 0,
								justifyContent: 'center',
								alignItems: 'flex-start',
								height: headerHeight,
								width,
								backgroundColor: headerbackgroundColor,
							}}>
							<SubHeadContainer>
								<ButtonContainer 
									onPress={() => _onPressNewChat()}
								>
									<MaterialCommunityIcons name='chat-plus' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
								</ButtonContainer>

								<ButtonContainer 
									onPress={() => console.log('test')}
								>
									<Octicons name='broadcast' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
								</ButtonContainer>

								<ButtonContainer 
									onPress={() => console.log('test')}
								>
									<MaterialIcons name='settings' size={18} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
								</ButtonContainer>
							</SubHeadContainer>
						</Animated.View>
					</>
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
		</Root>
	)
}

const ChatComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ChatComponent)

export default ChatComponentConnect
