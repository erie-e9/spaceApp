import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions, Platform, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ETASimpleText } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/carousel/actions'

const Root = styled.View`
    flex: 1;
    min-height: 60px;
	justify-content: center;
    align-items: center;
    margin: 3px 0px 4px 0px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemsList = styled.FlatList``
const Touchable = styled.TouchableWithoutFeedback.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	min-height: 20px;
	justify-content: center;
	align-items: center;
`

const mapStateToProps = (state) => {
	const {data} = state.categories
	return {data}
}

const mapDispatchProps = (dispatch) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			dispatch: {},
		})
	},
})

const StatusComponent = ({ getDataRequest, data }) => {
    const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [ items, setitems ] = useState([])
	const [ animatedValueTransform] = useState(new Animated.Value(0))
    let delayValue = 1000
    
	useEffect(() => {
		getDataRequest()
		setitems(data)
		Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('SubMenuNavigator', {
			screen: 'ItemsScreen',
			params: {
				name: item.name,
			},
		})
    }
    
    return (
        <Root>
            {true ? (
				<>
					<ItemsList
						data={items}
						keyExtractor={(item) => item._id.toString()}
						horizontal
						snapToAlignment='center'
						scrollEventThrottle={16}								
						snapToInterval={50}
						decelerationRate='fast'
						showsHorizontalScrollIndicator={false}
						renderItem={({item}) => {
							delayValue += 1000
							const translateX = animatedValueTransform.interpolate(
								{
									inputRange: [0, 1],
									outputRange: [
										delayValue,
										1,
									],
								},
							)
							return (
								<Touchable
									key={item._id}
									onPress={() =>
										_onPress(item)
									}>
									<Animated.View
										style={{
											transform: [
												{
													translateX,
												},
											],
										}}>
										{/* <HeadItem
											itemcat={item}
										/> */}
									</Animated.View>
								</Touchable>
							)
						}}
					/>
				</>
			) : null}
        </Root>
    )
}

const StatusComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(StatusComponent)

export default React.memo(StatusComponentConnect)
