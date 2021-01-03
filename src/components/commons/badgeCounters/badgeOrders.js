import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import IconWithBadge from './IconBadge'
import { GET_DATA_REQUEST } from '@redux/settings/processingorders/actions'

const mapStateToProps = (state) => {
	const { data } = state.processingorders
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {},
		})
	},
})

const BadgeOrders = ({ getDataRequest, children, data, color, size }) => {
    const [totalItems, settotalItems] = useState(data.length)
    
    useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		settotalItems(data.length)
		console.log('[BadgeOrders] data', data.length);
		
		return () => {
			isUnMounted = true
		}
    }, [data])
    
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

const BadgeOrdersConnect = connect(mapStateToProps, mapDispatchProps)(BadgeOrders)
export default BadgeOrdersConnect
