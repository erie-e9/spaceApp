import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from '@redux/root-reducer'
import { handler as userSaga } from '@redux/user/sagas'
import { handler as menuSaga } from '@redux/menu/sagas'
import { handler as similartoSaga } from '@redux/menu/similarto/sagas'
import { handler as categoriesSaga } from '@redux/menu/categories/sagas'
import { handler as itemsbycategorySaga } from '@redux/menu/categories/itemsbycategory/sagas'
import { handler as carouselSaga } from '@redux/menu/carousel/sagas'
import { handler as promotionsSaga } from '@redux/menu/promotions/sagas'
import { handler as sectionsSaga } from '@redux/menu/sections/sagas'
import { handler as cartSaga } from '@redux/cart/sagas'
import { handler as chatsSaga } from '@redux/chats/sagas'
import { handler as contactsSaga } from '@redux/chats/contacts/sagas'
import { handler as addressesSaga } from '@redux/profile/addresses/sagas'
import { handler as favoritesSaga } from '@redux/profile/favorites/sagas'
import { handler as notificationsSaga } from '@redux/profile/notifications/sagas'
import { handler as branchofficesSaga } from '@redux/profile/branchoffices/sagas'
import { handler as previousordersSaga } from '@redux/profile/previousorders/sagas'
import { handler as paymentmethodsSaga } from '@redux/profile/paymentmethods/sagas'
import { handler as faqsSaga } from '@redux/profile/help/faqs/sagas'
import { handler as customproductSaga } from '@redux/customproduct/sagas'
import { handler as flavorsSaga } from '@redux/customproduct/flavors/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(userSaga)
sagaMiddleware.run(menuSaga)
sagaMiddleware.run(similartoSaga)
sagaMiddleware.run(categoriesSaga)
sagaMiddleware.run(itemsbycategorySaga)
sagaMiddleware.run(promotionsSaga)
sagaMiddleware.run(sectionsSaga)
sagaMiddleware.run(carouselSaga)
sagaMiddleware.run(cartSaga)
sagaMiddleware.run(chatsSaga)
sagaMiddleware.run(contactsSaga)
sagaMiddleware.run(addressesSaga)
sagaMiddleware.run(favoritesSaga)
sagaMiddleware.run(notificationsSaga)
sagaMiddleware.run(branchofficesSaga)
sagaMiddleware.run(previousordersSaga)
sagaMiddleware.run(paymentmethodsSaga)
sagaMiddleware.run(faqsSaga)
sagaMiddleware.run(customproductSaga)
sagaMiddleware.run(flavorsSaga)

export { store }
