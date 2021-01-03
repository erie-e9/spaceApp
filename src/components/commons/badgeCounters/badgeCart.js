import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import IconWithBadge from './IconBadge'

const mapStateToProps = (state) => {
	const { data } = state.cart
	return { data }
}

const BadgeCart = ({ children, data, color, size }) => {
    const [totalItems, settotalItems] = useState(0)
	let sum = 0

	useEffect(() => {
		let isUnMounted = false
		_getsumatory()
		return () => {
			isUnMounted = true
		}
	}, [data, totalItems])

	const _getsumatory = () => {
		data.forEach((element) => {
            sum += element.howMany
			settotalItems(sum)
		})
    }
    
    return (
        <IconWithBadge
            totalItems={data.length > 0 ? totalItems : 0}
            size={size}
            color={color}
        >
            {children}
        </IconWithBadge>
    )
}

const BadgeCartConnect = connect(mapStateToProps, null)(BadgeCart)
export default BadgeCartConnect