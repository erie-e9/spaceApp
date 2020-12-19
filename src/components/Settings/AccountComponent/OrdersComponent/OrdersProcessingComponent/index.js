import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Platform} from 'react-native'
import {ETASimpleText, ETAButtonFilled} from '@etaui'
import {useNavigation} from '@react-navigation/native'
import OrdersProcessingItemComponent from './OrdersProcessingItemComponent'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/settings/processingorders/actions'

const Root = styled.View`
	flex: 0.6;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const CategorytItemsList = styled.FlatList``
const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})``
const EmptyListContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	background-color: transparent;
	`

const mapStateToProps = (state, props) => {
	const {data} = state.processingorders
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {},
		})
	},
})

const OrdersProcessingComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items, setitems] = useState([])

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setitems(data)
		
		return () => {
			isUnMounted = true
		}
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('SettingsNavigator', {
			screen: 'GetOneProcessingOrderScreen',
			params: {
				item,
			},
		})
	}
	return (
		<Root>
			<CategorytItemsList
				contentContainerStyle={{
					flexDirection: 'column',
					justifyContent: 'flex-start',
				}}
				data={items}
				keyExtractor={(item) => item._id.toString()}
				horizontal={!true}
				initialNumToRender={5}
				showsVerticalScrollIndicator={false}
				updateCellsBatchingPeriod={3000}
				renderItem={({item, i}) => (
					<Touchable
						key={item._id}
						onPress={() => _onPress(item)}>
						<OrdersProcessingItemComponent item={item} />
					</Touchable>
				)}
				ListEmptyComponent={() => (
					<EmptyListContainer>
						<ETASimpleText
							size={14}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '300'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							Don't have processing orders yet. 
						</ETASimpleText>
						<ETAButtonFilled
							title='See menu'
							onPress={() =>
								navigation.navigate(
									'ShopTabNavigator',
									{
										screen: 'Menu',
									},
								)
							}
							disabled={false}
							colorButton={
								themeContext.SECONDARY_BACKGROUND_COLOR
							}
							padding={10}
							width={240}
							borderRadius={3}
						/>
					</EmptyListContainer>
				)}
			/>
		</Root>
	)
}

const OrdersProcessingComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(OrdersProcessingComponent)

export default OrdersProcessingComponentConnect
