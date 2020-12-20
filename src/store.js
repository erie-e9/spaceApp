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
import { handler as statusSaga } from '@redux/menu/status/sagas'
import { handler as filtersSaga } from '@redux/menu/filters/sagas'
import { handler as itemsbystatusSaga } from '@redux/menu/status/itemsbystatus/sagas'
import { handler as promotionsSaga } from '@redux/menu/promotions/sagas'
import { handler as sectionsSaga } from '@redux/menu/sections/sagas'
import { handler as getoneItemSaga } from '@redux/menu/getoneItem/sagas'
import { handler as cartSaga } from '@redux/cart/sagas'
import { handler as clientsmessagesSaga } from '@redux/chats/clients/messages/sagas'
import { handler as clientscontactlistSaga } from '@redux/chats/clients/contactlist/sagas'
import { handler as employeesmessagesSaga } from '@redux/chats/employees/messages/sagas'
import { handler as employeescontactlistSaga } from '@redux/chats/employees/contactlist/sagas'
import { handler as addressesSaga } from '@redux/settings/addresses/sagas'
import { handler as favoritesSaga } from '@redux/settings/favorites/sagas'
import { handler as notificationsSaga } from '@redux/settings/notifications/sagas'
import { handler as branchofficesSaga } from '@redux/settings/branchoffices/sagas'
import { handler as processingordersSaga } from '@redux/settings/processingorders/sagas'
import { handler as previousordersSaga } from '@redux/settings/previousorders/sagas'
import { handler as paymentmethodsSaga } from '@redux/settings/paymentmethods/sagas'
import { handler as faqsSaga } from '@redux/settings/help/faqs/sagas'
import { handler as customproductSaga } from '@redux/customproduct/sagas'
import { handler as flavorsSaga } from '@redux/customproduct/flavors/sagas'
import { handler as languagesSaga } from '@redux/settings/appsettings/languages/sagas'
import { handler as currenciesSaga } from '@redux/settings/appsettings/currencies/sagas'
import { handler as themepickerSaga } from '@redux/settings/appsettings/themepicker/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(userSaga)
sagaMiddleware.run(menuSaga)
sagaMiddleware.run(similartoSaga)
sagaMiddleware.run(categoriesSaga)
sagaMiddleware.run(itemsbycategorySaga)
sagaMiddleware.run(promotionsSaga)
sagaMiddleware.run(sectionsSaga)
sagaMiddleware.run(getoneItemSaga)
sagaMiddleware.run(carouselSaga)
sagaMiddleware.run(statusSaga)
sagaMiddleware.run(filtersSaga)
sagaMiddleware.run(itemsbystatusSaga)
sagaMiddleware.run(cartSaga)
sagaMiddleware.run(clientsmessagesSaga)
sagaMiddleware.run(clientscontactlistSaga)
sagaMiddleware.run(employeesmessagesSaga)
sagaMiddleware.run(employeescontactlistSaga)
sagaMiddleware.run(addressesSaga)
sagaMiddleware.run(favoritesSaga)
sagaMiddleware.run(notificationsSaga)
sagaMiddleware.run(branchofficesSaga)
sagaMiddleware.run(processingordersSaga)
sagaMiddleware.run(previousordersSaga)
sagaMiddleware.run(paymentmethodsSaga)
sagaMiddleware.run(faqsSaga)
sagaMiddleware.run(customproductSaga)
sagaMiddleware.run(flavorsSaga)
sagaMiddleware.run(languagesSaga)
sagaMiddleware.run(currenciesSaga)
sagaMiddleware.run(themepickerSaga)

export { store }