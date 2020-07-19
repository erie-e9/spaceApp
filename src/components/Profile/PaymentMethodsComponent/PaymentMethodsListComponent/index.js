import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETASimpleText} from '@etaui'
import {Ionicons} from '@icons'
import PaymentCardComponent from './Card'
import {connect} from 'react-redux'
import {GET_ALL_ITEMS_REQUEST} from '@redux/profile/paymentmethods/actions'

const {width} = Dimensions.get('window')
const iconSize = 26

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const PaymentMethodsList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`
const Touchable = styled.TouchableOpacity``
const Card = styled.View`
    flex-direction: row;
    width: ${width - 20}px;
    min-height: 80px;
    justify-content: center;
    align-self: center;
    background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    border-radius: 5px
    padding: 10px;
    margin-bottom: 5px;
`
const MetadataInfo = styled.View`
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	padding-bottom: 5px;
	background-color: transparent;
`
const MetadaInfoHead = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const CompanyIconContainer = styled.View`
	padding-horizontal: 10px;
`

const mapStateToProps = (state, props) => {
	const {data} = state.paymentmethods
	return {data}
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST,
			payload: {},
		})
	},
})

const PaymentMethodsListComponent = ({getAllItemsRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const [items, setitems] = useState([])
	const [refresher, setrefresher] = useState(!true)

	useEffect(() => {
		getAllItemsRequest()
		setitems(data)
		_getData()
	}, [data])

	const _onPress = (item) => {
		navigation.navigate('SettingsNavigator', {
			screen: 'GetOnePaymentMethodScreen',
			params: {
				item,
			},
		})
	}

	const _getData = () => {
		setrefresher(true)
		setitems(data)
		setrefresher(!true)
	}

	return (
		<Root>
			<PaymentMethodsList
				contentContainerStyle={{
					alignSelf: 'stretch',
				}}
				data={data}
				keyExtractor={(item) => item._id.toString()}
				showsVerticalScrollIndicator={false}
				refreshing={refresher}
				onRefresh={() => _getData()}
				renderItem={({item}) => (
					<Touchable
						key={item._id}
						onPress={() => _onPress(item)}>
						<PaymentCardComponent {...item} />
					</Touchable>
				)}
				ListFooterComponent={() => (
					<Touchable>
						<Card>
							<MetadataInfo>
								<MetadaInfoHead>
									<ETASimpleText
										size={13}
										weight={
											Platform.OS ===
											'ios'
												? '500'
												: '800'
										}
										color={
											themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
										}
										align='left'>
										Cash
									</ETASimpleText>
									<CompanyIconContainer>
										<Ionicons
											name='md-cash'
											size={
												iconSize -
												6
											}
											color={
												themeContext.PRIMARY_TEXT_COLOR_LIGHT
											}
										/>
									</CompanyIconContainer>
								</MetadaInfoHead>
								<ETASimpleText
									size={11}
									weight={
										Platform.OS ===
										'ios'
											? '300'
											: '200'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									You can pay with cash too
								</ETASimpleText>
							</MetadataInfo>
						</Card>
					</Touchable>
				)}
			/>
		</Root>
	)
}

const PaymentMethodsListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(PaymentMethodsListComponent)

export default PaymentMethodsListComponentConnect
