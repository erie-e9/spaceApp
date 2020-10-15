import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { ETACarousel } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/menu/carousel/actions'

const HeaderContainer = styled.View`
	flex: 1;
	justify-content: center;
	margin: -1px 0px 0px 0px;
`

const mapStateToProps = (state, props) => {
	const {data} = state.carousel

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

const CarouselComponent = ({ getDataRequest, data, items }) => {
	
	useEffect(() => {
		getDataRequest()
	}, [data])

	return (
		<HeaderContainer>
			{data.length > 0 ? (
				<ETACarousel
					posts={data}
					data={items}
					autoplay
					time={6000}
					sizeHeight={145}
				/>
			) : null}
		</HeaderContainer>
	)
}

const CarouselComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(CarouselComponent)

export default React.memo(CarouselComponentConnect)
