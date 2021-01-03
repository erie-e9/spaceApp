import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, Animated } from 'react-native'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import ChatCard from './ChatCard'
import { ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/chats/clients/messages/actions'
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@icons'

const HEADER_MIN_HEIGHT = 40
const HEADER_MAX_HEIGHT = 40
const {width} = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
const ChatsFlatList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
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
	const { data } = state.clientsmessages
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const ChatComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ items, setitems ] = useState(null)
	const [ scrollYAnimatedValue ] = useState(new Animated.Value(0))
	const ref = React.useRef(null)
	useScrollToTop(ref)

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setTimeout(() => {
			setitems(data)
		}, 1000);
		
		return () => {
			isUnMounted = true
		}
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
				paramData: item,
				username: item.client.username,
				user: {
					username: item.client.username,
					firstname: item.client.firstname,
					lastname: item.client.lastname,
					avatar: item.client.avatar,
					cellphone: item.client.cellphone
				}
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
				items !== null
				?	<>
						<ChatsFlatList
							ref={ref}
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
									onPress={() => navigation.navigate('SettingsNavigator', {screen: 'ChatsSettingsScreen'})}
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
