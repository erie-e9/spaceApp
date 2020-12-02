import React, { useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'
import _ from 'lodash'
import Card from './Card'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/profile/notifications/actions'

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 5px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const NotificationSettingContainer = styled.View`
	flex-direction: column;
	padding: 0px 15px;
	background-color: transparent;
`
const ItemContainer = styled.View``

const mapStateToProps = (state, props) => {
	const { data } = state.notifications

	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const NotificationsSettingsComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	
	useEffect(() => {
		getDataRequest()
		console.log('[NotificationsSettingsComponent] data: ', data);
	}, [data])

	return (
		<Root>
			{
				data
				?	<NotificationSettingContainer>
						{
							data.map((element, i) => {
								// console.log('element: ', element);
								return (
									<ItemContainer key={i}>
										<ETASimpleText
											size={15}
											weight={Platform.OS === 'ios' ? '400' : '800'}
											color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
											align='left'
											style={{ marginTop: 10, marginBottom: 1}}>
											{element.group}
										</ETASimpleText>
										{
											element.items.map((item, j) => {
												return (
													<Card
														key={j}
														headTitle={item.headTitle}
														headTitleID={item.headTitleID}
														message={item.message}
														active={item.active}
													/>
												)
											})
										}
									</ItemContainer>
								)
							})
						}
					</NotificationSettingContainer>
				:	null
			}
		</Root>
	)
}

const NotificationsSettingsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NotificationsSettingsComponent)

export default React.memo(NotificationsSettingsComponentConnect)
