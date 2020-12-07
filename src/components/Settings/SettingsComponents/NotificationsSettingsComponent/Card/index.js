import React, { useState, useEffect, useContext } from 'react'
import { Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { ETASimpleText, ETASwitch } from '@etaui'
import { connect } from 'react-redux'
import { TOGGLE_NOTIFICATION } from '@redux/profile/notifications/actions'

const Card = styled.View`
	flex-direction: row;
	margin-bottom: 1px;
	min-height: 20px;
	align-items: center;
	padding-left: 10px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const MetadataInfo = styled.View`
	width: 100%;
	flex-direction: column;
	justify-content: center;
	padding-horizontal: 1px;
	background-color: transparent;
`
const MetadaInfoHead = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 10px 2px 0px;
	background-color: transparent;
`
const MessageContainer = styled.View`
	flex-direction: row;
	min-height: 20px;
	align-items: center;
	padding-left: 10px;
	background-color: transparent;
`

const mapDispatchProps = (dispatch, props) => ({
	toggleNotification: (paramItem) => {
		console.log('[NotificationCardComponent] mapDispatchProps toggleNotification paramItem: ', paramItem);
		
		dispatch({
			type: TOGGLE_NOTIFICATION,
			payload: {
				paramItem
			}
		})
	}

})

const NotificationCardComponent = ({ headTitle, headTitleID, message, active, toggleNotification }) => {
	const themeContext = useContext(ThemeContext)
	const [ switchItem, setswitchItem ] = useState(active)
	const [ _switchItem, _setswitchItem ] = useState()

	const _switch = async (item) => {
		await setswitchItem(!switchItem)
		await _setswitchItem(item)
		// toggleNotification(id)
	}
	
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
									: '800'
							}
							color={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							align='left'>
							{headTitle}
						</ETASimpleText>
						<ETASwitch
							// onChange={() => { setswitchItem(!switchItem); _setswitchItem(headTitleID)}}
							onChange={() => _switch({ headTitleID, active: !switchItem })}
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
									? '400'
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
