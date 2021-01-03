import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import IconWithBadge from './IconBadge'
import { GET_DATA_REQUEST as GET_DATA_REQUEST_CLIENTS } from '@redux/chats/clients/messages/actions'

const mapStateToProps = (state) => {
	const { data } = state.clientsmessages
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST_CLIENTS,
			payload: {},
		})
	},
})

const BadgeChat = ({ getDataRequest, children, data, color, size }) => {
	const [totalItems, settotalItems] = useState(0)
	let sum = 0

	useEffect(() => {
		getDataRequest()
	}, [sum])

	useEffect(() => {
		let isUnMounted = false
		_getsumatory()

		return () => {
			isUnMounted = true
		}
	}, [data])

	const _getsumatory = async () => {
		await data.forEach((element) => {
			sum += element.unreaded_massages
			settotalItems(sum)
		})
	}

    return (
        <IconWithBadge
            totalItems={totalItems}
            size={size}
            color={color}
        >
            {children}
        </IconWithBadge>
    )
}

const BadgeChatConnect = connect(mapStateToProps, mapDispatchProps)(BadgeChat)
export default BadgeChatConnect