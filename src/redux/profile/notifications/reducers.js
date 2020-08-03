import { GET_DATA_REQUEST_SUCCESS, TOOGLE_NOTIFICATION_SUCCESS } from './actions'

const initialState = {
    email: true,
    push_notifications: true,
    sms: false,
    paused_orders: true,
    weekly_offers: true
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQUEST_SUCCESS:
            const { email,
                    push_notifications,
                    sms,
                    paused_orders,
                    weekly_offers } = action.payload        
            return { email,
                    push_notifications,
                    sms,
                    paused_orders,
                    weekly_offers }
    
        default:
            return state
    }
}

export { reducer }