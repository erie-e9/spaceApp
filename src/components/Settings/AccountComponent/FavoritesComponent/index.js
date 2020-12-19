import React, {useState, useEffect, useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText, ETAButtonFilled} from '@etaui'
import {useNavigation} from '@react-navigation/native'
import FavoriteItemComponent from './FavoriteItemComponent'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/settings/favorites/actions'

const Root = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	background-color: transparent;
`
const CategorytItemsList = styled.FlatList``
const EmptyListContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const {data} = state.favorites
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

const FavoritesListComponent = ({ getDataRequest, data }) => {
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
							Don't have favorites yet. 
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
				renderItem={({item, i}) => {
					return (
						<FavoriteItemComponent
							item={item}
							howMany={item.howMany}
						/>
					)
				}}
			/>
		</Root>
	)
}

const FavoritesListComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(FavoritesListComponent)

export default FavoritesListComponentConnect
