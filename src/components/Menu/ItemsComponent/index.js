import React, { useState, useEffect, useContext } from 'react'
import { Animated, Platform } from 'react-native'
import { useRoute } from '@react-navigation/native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETALoader } from '@etaui'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import FilterModal from '@commons/FilterModal'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST as GET_ITEMS_BY_CATEGORY_REQUEST } from '@redux/menu/categories/itemsbycategory/actions'
import { ADD_FILTERS, TOGGLE_MODAL, GET_DATA_REQUEST, DELETE_FILTERS } from '@redux/menu/filters/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CategoryItemsList = styled.FlatList``

const mapStateToProps = (state, props) => {
	const itemsbycategory = state.itemsbycategory.data
	const { data, toggle_modal } = state.filters
	return { data, toggle_modal, itemsbycategory }
}

const mapDispatchProps = (dispatch, props) => ({
	addFilters: ({ title, active }) => {
		dispatch({
			type: ADD_FILTERS,
			payload: {
				paramItem: { title, active }
			}
		})
	},

	toggleModal: (toggle_modal) => {
		dispatch({
            type: TOGGLE_MODAL,
            payload: {
				toggle_modal,
			}
		})
	},

	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {}
		})
	},

	getDataRequestItems: () => {
		dispatch({
			type: GET_ITEMS_BY_CATEGORY_REQUEST,
			payload: {
				id: 1
			}
		}) 
	},
	
	deleteFilters: () => {
		dispatch({
			type: DELETE_FILTERS,
			payload: {}
		})
	}
})

const ItemsComponent = ({ toggleModal, toggle_modal, addFilters, getDataRequest, data, deleteFilters, getDataRequestItems, itemsbycategory }) => {
	const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const { name } = route?.params
	const [ isTopModalVisible, setisTopModalVisible ] = useState(toggle_modal ? toggle_modal : false)
	const [ dynamicItems, setdynamicItems ] = useState(null)
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	let delayValue = 700
	let _data = []

	useEffect(() => {
		if (itemsbycategory.length > 0) {
			Animated.spring(animatedValueTransform, {
				toValue: 1,
				tension: 5,
				useNativeDriver: true,
			}).start()

			Animated.timing(opacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true,
			}).start()

			itemsbycategory.forEach(element => {
				_data.unshift(element.status)
			})

			if (_data.length !== 0) {
                let uniques = [...new Set(_data)]
				uniques.forEach(element => {
					if (element !== '' && element !== undefined) {
						addFilters({ title: element, active: false })
					}
				})
			}
		}
	}, [])

	useEffect(() => {
		deleteFilters()
		getDataRequestItems()
		// console.log('getDataRequestItems itemsbycategory: ', itemsbycategory);
	}, [itemsbycategory])

	useEffect(() => {
		setisTopModalVisible(toggle_modal)
	}, [toggle_modal])

	useEffect(() => {
		getDataRequest()
		if (data.length > 0) {
			let actives = []
			data.forEach(element => {
				if (element.active === true) {
					actives.unshift(element.title)
				}
			})

			if (actives.length > 0) {
				let filters
				let arrayFilters = []
				actives.forEach((element, i) => {
					arrayFilters.unshift(itemsbycategory.filter((item, index) => {
						// console.log('item.status ', item.status )
						return item.status === element
					}))
				})
				// console.log('arrayFilters[0] ', arrayFilters[0] );
				
				setdynamicItems(arrayFilters[0])
			} else {
				setdynamicItems(itemsbycategory)
			}
		}
	}, [data])

	return (
		<>
			<FilterModal
				isVisible={isTopModalVisible}
				onSwipeComplete={() => toggleModal(false)}
				closeModal={() => toggleModal(false)}
			/>
			<Root>
				{
					dynamicItems !== null
					?	<CategoryItemsList
							contentContainerStyle={{
								flexDirection: 'column',
								alignSelf: 'center',
							}}
							data={dynamicItems}
							keyExtractor={(item) => item._id.toString()}
							horizontal={!true}
							numColumns={2}
							initialNumToRender={2}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={() => (
								<ETASimpleText
									size={14}
									weight={
										Platform.OS === 'ios' ? '400' : '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									Empty list
								</ETASimpleText>
							)}
							renderItem={({item}) => {
								delayValue += 700
								const translateY = animatedValueTransform.interpolate(
									{
										inputRange: [0, 1],
										outputRange: [delayValue, 1],
										extrapolate: 'clamp',
									},
								)
								return (
									<Animated.View
										style={{
											opacity,
											transform: [
												{
													translateY,
												},
											],
										}}>
										<GeneralItemComponent item={item} />
									</Animated.View>
								)
							}}
						/>
						:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
				}
			</Root>
		</>
	)
}

const ItemsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(ItemsComponent)
export default ItemsComponentConnect
