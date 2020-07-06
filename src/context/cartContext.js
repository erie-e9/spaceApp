import React from 'react'
import createContext from '@context/createContext'

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'addToCart':
			return {
				...state,
				data: action.payload.data,
				message: action.payload.message,
				error: action.payload.error,
			}
		case 'removeToCart':
			return {
				...state,
				data: action.payload.data,
				message: action.payload.message,
				error: action.payload.error,
			}
		case 'removeItemToCart':
			return {
				...state,
				data: action.payload.data,
				message: action.payload.message,
				error: action.payload.error,
			}
		case 'getCartItems':
			return {
				...state,
				data: action.payload.data,
				message: action.payload.message,
				error: action.payload.error,
			}
		default:
			return state
	}
}

let localDataCart = []

const addToCart = (dispatch) => async (item) => {
	try {
		if (localDataCart.length >= 0) {
			// console.log('añadido: ', item._id);
			let itemFound = localDataCart.find(
				(element) => element._id === item._id,
			)
			// console.log('itemFound', itemFound);

			if (itemFound) {
				// console.log('encontrado');
				itemFound.howMany = itemFound.howMany + 1
			} else {
				// console.log('no encontrado');
				localDataCart.unshift({
					...item,
					howMany: 1,
				})
			}
		}

		// console.log('localDataCart: ', localDataCart)

		const pay = {
			data: localDataCart,
			message: `+1 on cart: ${localDataCart.length}`,
			error: '',
		}

		dispatch({
			type: 'addToCart',
			payload: pay,
		})
	} catch {
		const pay = {
			data: '',
			message: 'addToCart error message',
			error: '',
		}

		dispatch({
			type: 'addToCart',
			payload: pay,
		})
	}
}

const removeToCart = (dispatch) => async (_id) => {
	try {
		if (localDataCart.length >= 0) {
			let itemFound = localDataCart.find(
				(element) => element._id === _id,
			)
			if (itemFound.howMany > 1) {
				itemFound.howMany = itemFound.howMany - 1
				// console.log('eliminado we XD');
			} else {
				for (var i = localDataCart.length; i--; ) {
					if (localDataCart[i]._id === _id) {
						localDataCart.splice(i, 1)
					}
				}
			}
		}

		// console.log('removeToCart localDataCart: ', localDataCart)

		const pay = {
			data: localDataCart,
			message: `-1 on cart: ${localDataCart.length}`,
			error: '',
		}

		dispatch({
			type: 'removeToCart',
			payload: pay,
		})
	} catch {
		const pay = {
			data: '',
			message: 'removeToCart error message',
			error: '',
		}

		dispatch({
			type: 'removeToCart',
			payload: pay,
		})
	}
}

const removeItemToCart = (dispatch) => async (_id) => {
	try {
		if (localDataCart.length >= 0) {
			// let itemFound = localDataCart.find((element) => element._id === _id);

			for (var i = localDataCart.length; i--; ) {
				if (localDataCart[i]._id === _id) {
					localDataCart.splice(i, 1)
				}
			}
		}

		console.log('removeItemToCart localDataCart: ', localDataCart)

		const pay = {
			data: localDataCart,
			message: `-1 on cart: ${localDataCart.length}`,
			error: '',
		}

		dispatch({
			type: 'removeToCart',
			payload: pay,
		})
	} catch {
		const pay = {
			data: '',
			message: 'removeToCart error message',
			error: '',
		}

		dispatch({
			type: 'removeToCart',
			payload: pay,
		})
	}
}

const getCartItems = (dispatch) => async () => {
	try {
		// if (localDataCart.length === 0) {

		// }

		// console.log('localDataCart: ', localDataCart)

		const pay = {
			data: localDataCart,
			message: `Cart items: ${localDataCart.length}`,
			error: '',
		}

		dispatch({
			type: 'getCartItems',
			payload: pay,
		})
	} catch {
		const pay = {
			data: '',
			message: 'getCartItems error message',
			error: '',
		}

		dispatch({
			type: 'getCartItems',
			payload: pay,
		})
	}
}

export const {Provider, Context} = createContext(
	/* reducer */ cartReducer,
	/* actions*/ {addToCart, removeToCart, removeItemToCart, getCartItems},
	/* defaultValues */ {
		data: [],
		message: null,
		error: null,
	},
)
