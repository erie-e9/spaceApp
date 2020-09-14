import React, {useState, useEffect, useContext} from 'react'
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
	const [groupedBy, setgroupedBy] = useState() 
	
	useEffect(() => {
		getDataRequest()
		console.log('NotificationsComponent: data',  { data });
		if (data) {
			let grouped = _.groupBy(data, 'group')
			console.alert('[NotificationsComponent] useEffect grouped: ', grouped[0]);
			setgroupedBy(grouped)
		}
	}, [data])

	return (
		<Root>
			{/* {
				data
				?	<>
						{
							groupedBy.map((item) => {
								return (
									<NotificationSettingContainer key={element._id}>
										<ETASimpleText
											size={15}
											weight={Platform.OS === 'ios' ? '400' : '800'}
											color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
											align='left'>
											{element.group}
										</ETASimpleText>
											{
												item.forEach(element => {
													return (
															<Card
																headTitle={element.headTitle}
																headTitleID={element.headTitleID}
																message={element.message}
																active={element.active}
															/>
													)
												})
											}
									</NotificationSettingContainer>
								)
							})
						}
					</>
				:	null
			} */}
			
			<NotificationSettingContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					Messages
				</ETASimpleText>
				<Card
					headTitle='Email'
					headTitleID='email'
					message='Will send you relevant information, promotions and offers about our products via email.'
					// active={email}
				/>
				<Card
					headTitle='Push notifications'
					headTitleID='push_notifications'
					message='Will send you relevant information, promotions and offers about our products via notifications.'
					// active={push_notifications}
				/>
				<Card
					headTitle='SMS'
					headTitleID='sms'
					message='Will send you relevant information, promotions and offers about our products via message sms.'
					// active={sms}
				/>
			</NotificationSettingContainer>

			<NotificationSettingContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					Reminders
				</ETASimpleText>
				<Card
					headTitle='Paused orders'
					headTitleID='paused_orders'
					message='Will send you relevant information, promotions and offers about our products via email.'
					// active={paused_orders}
				/>
			</NotificationSettingContainer>

			<NotificationSettingContainer>
				<ETASimpleText
					size={15}
					weight={Platform.OS === 'ios' ? '400' : '800'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					align='left'>
					Promotions
				</ETASimpleText>
				<Card
					headTitle='Weekly offers'
					headTitleID='weekly_offers'
					message='Will send you relevant information, promotions and offers about our products via email.'
					// active={weekly_offers}
				/>
			</NotificationSettingContainer>
		</Root>
	)
}

const NotificationsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NotificationsComponent)

export default React.memo(NotificationsComponentConnect)
// export default NotificationsComponent
