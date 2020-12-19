import React, { useState, useEffect, useContext, memo, useRef, createRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETAStarRating, ETALoader } from '@etaui'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST_REVIEWS } from '@redux/menu/getoneItem/actions'

const Root = styled.View`
	height: 350px;
    width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: transparent;
`
const ListItems = styled.FlatList`
	height: 350px;
	background-color: transparent;
`
const ReviewComponent = styled.View`
	min-height: 10px;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: transparent;
`
const HeaderReviewContainer = styled.View`
	min-height: 10px;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	margin: 10px 0px 0px 0px;
	background-color: transparent;
`
const LeftContainer = styled.View`
	flex: 1;
	flex-direction: row;
`
const ContentReviewContainer = styled.View`
	width: 100%;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 5px;
	padding-horizontal: 1px;
	background-color: transparent;
`
const EmptyListContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	background-color: transparent;
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
		let isUnMounted = false
		getDataRequest()
		setitems(data)
		
		return () => {
			isUnMounted = true
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
							minHeight: 350
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
									<HeaderReviewContainer>
										<LeftContainer>
											<ETAStarRating
												ratings={
													item.rating
												}
											/>
										</LeftContainer>
										<ETASimpleText
												size={12}
												weight={
													Platform.OS === 'ios'
														? '400'
														: '300'
												}
												color={
													themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
												}
												align='left'>
												{item.date}
											</ETASimpleText>
									</HeaderReviewContainer>
									<ContentReviewContainer>
										<ETASimpleText
											size={12}
											weight={
												Platform.OS === 'ios'
													? '400'
													: '300'
											}
											color={
												themeContext.PRIMARY_TEXT_COLOR_LIGHT
											}
											align='justify'>
											{item.review}
										</ETASimpleText>
									</ContentReviewContainer>
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
