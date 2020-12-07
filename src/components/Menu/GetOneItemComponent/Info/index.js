import React, { useState, useEffect, useContext, memo, useRef, createRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETAStarRating, ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/cart/actions'
import GeneralInfoComponent from './GeneralInfoComponent'
import NutritionFactsComponent from './NutritionFactsComponent'

const Root = styled.View`
	flex: 1;
    width: 100%;
	flex-direction: column;
	justify-content: center;
	background-color: transparent;
`
const ListItems = styled.FlatList``
const EmptyListContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	background-color: transparent;
`
const ReviewComponent = styled.View``

const mapStateToProps = (state, props) => {
	const {data} = state.cart
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

const InfoTopTabsComponent = memo(({ getDataRequest, data, totalRaitings }) => {
    const themeContext = useContext(ThemeContext)
    const [ items, setitems ] = useState([])
    
    useEffect(() => {
		let isUnMounted = false
		getDataRequest()
        // setitems(data)
	
		return () => {
			isUnMounted = true
		}
	}, [data])

    return (
        <Root>
            <GeneralInfoComponent />
            <NutritionFactsComponent />
        </Root>
    )
})

const InfoTopTabsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(InfoTopTabsComponent)

export default InfoTopTabsComponentConnect
