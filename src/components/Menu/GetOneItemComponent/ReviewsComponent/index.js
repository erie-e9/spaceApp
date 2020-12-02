import React, { useState, useEffect, useContext, memo, useRef, createRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETAStarRating, ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST_REVIEWS } from '@redux/menu/getoneItem/actions'

const Root = styled.View`
	flex: 1;
    width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
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
const ReviewComponent = styled.View`
	justify-content: flex-start;
	align-items: flex-start;
`

const mapStateToProps = (state, props) => {
	const { data } = state.getoneItem
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST_REVIEWS,
			payload: {},
		})
	},
})

const ReviewsComponent = memo(({ getDataRequest, data, totalRaitings }) => {
    const themeContext = useContext(ThemeContext)
    const [ items, setitems ] = useState([])
    
    useEffect(() => {
		getDataRequest()
		setitems(data)
		return () => {
			getDataRequest()
		}
	}, [data])

    return (
        <Root>
            {
				items !== null
				?	<ListItems
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
									This product has no reviews yet.
								</ETASimpleText>
							</EmptyListContainer>
						)}
						renderItem={({item, i}) => {
                            return (
								<ReviewComponent>
									<ETAStarRating
										ratings={
											item.rating
										}
									/>
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
										{item.review}
									</ETASimpleText>
								</ReviewComponent>
                            )
						}}
					/>
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
        </Root>
    )
})

const ReviewsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(ReviewsComponent)

export default ReviewsComponentConnect
