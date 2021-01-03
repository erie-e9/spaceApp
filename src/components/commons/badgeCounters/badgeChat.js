import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import IconWithBadge from './IconBadge'
import { GET_DATA_REQUEST as GET_DATA_REQUEST_CLIENTS} from '@redux/chats/clients/messages/actions'
import { GET_DATA_REQUEST as GET_DATA_REQUEST_EMPLOYEES } from '@redux/chats/employees/messages/actions'

const mapStateToProps = (state) => {
	const dataclients = state.clientsmessages
	const dataemployees = state.employeesmessages
	return { dataclients, dataemployees }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequestClients: () => {
		dispatch({
			type: GET_DATA_REQUEST_CLIENTS,
			payload: {},
		})
	},
	
	getDataRequestEmployees: () => {
		dispatch({
			type: GET_DATA_REQUEST_EMPLOYEES,
			payload: {},
		})
	},
})

const BadgeChat = ({ getDataRequestClients, getDataRequestEmployees, children, dataclients, dataemployees, color, size }) => {
	const [totalItems, settotalItems] = useState(0)
	let sum = 0

	useEffect(() => {
		getDataRequestClients()
		getDataRequestEmployees()
	}, [sum])

	useEffect(() => {
		let isUnMounted = false
		_getsumatory()

		return () => {
			isUnMounted = true
		}
	}, [dataclients, dataemployees])

	const _getsumatory = async () => {
		await [...dataclients.data, ...dataemployees.data].forEach((element) => {
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