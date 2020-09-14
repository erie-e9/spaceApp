import React, {useState, useEffect, useContext} from 'react'
import {Platform} from 'react-native'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText, ETASwitch} from '@etaui'
import {connect} from 'react-redux'
import {TOOGLE_NOTIFICATION} from '@redux/profile/notifications/actions'

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
	padding-bottom: 2px;
	padding-horizontal: 1px;
	background-color: transparent;
`
const MetadaInfoHead = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 2px;
	background-color: transparent;
`
const MessageContainer = styled.View`
	flex-direction: row;
	min-height: 30px;
	align-items: center;
	padding-horizontal: 10px;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	toogleNotification: (id) => {
		dispatch({
			type: TOOGLE_NOTIFICATION,
			payload: {
				id
			}
		})
	}

})

const NotificationCardComponent = ({ headTitle, headTitleID, message, active, toogleNotification }) => {
	const themeContext = useContext(ThemeContext)
	// const [switchItem, setswitchItem] = useState(!true)

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
							onChange={() => toogleNotification(headTitleID)}
							// onChange={() =>
							// 	setswitchItem(!switchItem)
							// }
							activated={active}
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
	null,
	mapDispatchProps,
)(NotificationCardComponent)

export default React.memo(NotificationCardComponentConnect)
// export default React.memo(NotificationCardComponent)
