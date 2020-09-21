import React, {useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import _ from 'lodash'
import Card from './Card'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/profile/notifications/actions'

const Root = styled.ScrollView`
	flex: 1;
	flex-direction: column;
	padding-top: 15px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const NotificationSettingContainer = styled.View`
flex-direction: column;
padding: 5px 15px;
background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const View = styled.View``

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

const NotificationsComponent = ({ getDataRequest, data }) => {
	const themeContext = useContext(ThemeContext)
	
	useEffect(() => {
		getDataRequest()
		console.log('[NotificationsComponent] data: ', data);
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
									<View key={i}>
										<ETASimpleText
											size={15}
											weight={Platform.OS === 'ios' ? '400' : '800'}
											color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
											align='left'
											style={{ marginTop: 5, marginBottom: 7 }}>
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
									</View >
								)
							})
						}
					</NotificationSettingContainer>
				:	null
			}
		</Root>
	)
}

const NotificationsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NotificationsComponent)

export default React.memo(NotificationsComponentConnect)
// export default NotificationsComponent
