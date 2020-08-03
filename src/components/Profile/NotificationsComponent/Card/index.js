import React, {useState, useEffect, useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText, ETASwitch} from '@etaui'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/profile/notifications/actions'

const Card = styled.View`
	flex-direction: row;
	margin-bottom: 1px;
	min-height: 40px;
	align-items: center;
	padding-horizontal: 10px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const MetadataInfo = styled.View`
	width: 100%;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 5px;
	padding-horizontal: 1px;
	background-color: transparent;
`
const MetadaInfoHead = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
`
const MessageContainer = styled.View`
	flex-direction: row;
	min-height: 30px;
	align-items: center;
	padding-horizontal: 10px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const mapStateToProps = (state, props) => {
	const { email,
		 	push_notifications,
	 		sms,
 			paused_orders,
			weekly_offers } = state.notifications
	return { email,
			 push_notifications,
			 sms,
			 paused_orders,
			 weekly_offers }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const NotificationCardComponent = ({headTitle, message, getDataRequest, email, push_notifications, sms, paused_orders, weekly_offers }) => {
	const themeContext = useContext(ThemeContext)
	const [switchItem, setswitchItem] = useState(!true)

	useEffect(() => {
		getDataRequest()
		console.log({ email, push_notifications, sms, paused_orders, weekly_offers });
	}, [switchItem])
	
	return (
		<>
			<Card>
				<MetadataInfo>
					<MetadaInfoHead>
						<ETASimpleText
							size={13}
							weight={
								Platform.OS === 'ios'
									? '600'
									: 'bold'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{headTitle}
						</ETASimpleText>
						<ETASwitch
							onChange={() =>
								setswitchItem(!switchItem)
							}
							activated={switchItem}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
						/>
					</MetadaInfoHead>
					<MessageContainer>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios'
									? '300'
									: '200'
							}
							color={
								themeContext.PRIMARY_TEXT_COLOR_LIGHT
							}
							align='left'>
							{message}
						</ETASimpleText>
					</MessageContainer>
				</MetadataInfo>
			</Card>
		</>
	)
}

const NotificationCardComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(NotificationCardComponent)

export default React.memo(NotificationCardComponentConnect)
