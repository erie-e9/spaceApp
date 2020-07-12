import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer } from '@redux/root-reducer'
import { handler as userSaga } from '@redux/user/sagas'
import { handler as menuSaga } from '@redux/menu/sagas'
import { handler as categoriesSaga } from '@redux/menu/categories/sagas'
import { handler as carouselSaga } from '@redux/menu/carousel/sagas'
import { handler as cartSaga } from '@redux/chats/sagas'
import { handler as chatsSaga } from '@redux/chats/sagas'
import { handler as addressesSaga } from '@redux/profile/addresses/sagas'
import { handler as branchofficesSaga } from '@redux/profile/branchoffices/sagas'
import { handler as paymentmethodsSaga } from '@redux/profile/paymentmethods/sagas'
import { handler as faqsSaga } from '@redux/profile/help/faqs/sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(userSaga)
sagaMiddleware.run(menuSaga)
sagaMiddleware.run(categoriesSaga)
sagaMiddleware.run(carouselSaga)
sagaMiddleware.run(cartSaga)
sagaMiddleware.run(chatsSaga)
sagaMiddleware.run(addressesSaga)
sagaMiddleware.run(branchofficesSaga)
sagaMiddleware.run(paymentmethodsSaga)
sagaMiddleware.run(faqsSaga)

export { store }