import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText } from '@etaui'
import { useTranslation } from '@etaui/translate'
import { Entypo } from '@icons'

const Root = styled.SafeAreaView`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding-vertical: 10px;
	z-index: 1000;
	background-color: ${(props) =>
		props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`
const ButtonContainer = styled.TouchableOpacity`
	height: 18px;
	width: 18px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`

const ETANetInfo = () => {
	const themeContext = useContext(ThemeContext)
	const [ isInternetReachable, setisInternetReachable ] = useState(true)
	const { no_internet } = useTranslation()

	useEffect(() => {
		let isUnMounted = false
		checkConnection()

		return () => {
			isUnMounted = true
		}
	}, [])

	const checkConnection = async () => {
		const unsubscribe = await NetInfo.addEventListener((state) => {
			setisInternetReachable(state.isInternetReachable)
			console.log(
				'isInternetReachable: ',
				state.isInternetReachable,
			)
		})
	}

	if (isInternetReachable) {
		return null
	}

	return (
		<Root>
			<ButtonContainer 
				onPress={() => console.log()}
			>
				<Entypo name='info' size={12} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
			</ButtonContainer>
			<ETASimpleText
				size={14}
				weight='400'
				color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
				align='center'>
				{no_internet.charAt(0).toUpperCase() + no_internet.slice(1)} {'  '}
			</ETASimpleText>
			<ActivityIndicator
				size='small'
				color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
			/>
		</Root>
	)
}

export default ETANetInfo
