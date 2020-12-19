import { combineReducers } from 'redux'
import { reducer as userReducer } from './user/reducers'
import { reducer as menuReducer } from './menu/reducers'
import { reducer as similartoReducer } from './menu/similarto/reducers'
import { reducer as categoriesReducer } from './menu/categories/reducers'
import { reducer as itemsbycategoryReducer } from './menu/categories/itemsbycategory/reducers'
import { reducer as carouselReducer } from './menu/carousel/reducers'
import { reducer as statusReducer } from './menu/status/reducers'
import { reducer as itemsbystatusReducer } from './menu/status/itemsbystatus/reducers'
import { reducer as promotionsReducer } from './menu/promotions/reducers'
import { reducer as sectionsReducer } from './menu/sections/reducers'
import { reducer as filtersReducer } from './menu/filters/reducers'
import { reducer as getoneItemReducer } from './menu/getoneItem/reducers'
import { reducer as cartReducer } from './cart/reducers'
import { reducer as clientsmessagesReducer } from './chats/clients/messages/reducers'
import { reducer as clientscontactlistReducer } from './chats/clients/contactlist/reducers'
import { reducer as employeesmessagesReducer } from './chats/employees/messages/reducers'
import { reducer as employeescontactlistReducer } from './chats/employees/contactlist/reducers'
import { reducer as addressesReducer } from './settings/addresses/reducers'
import { reducer as favoritesReducer } from './settings/favorites/reducers'
import { reducer as notificationsReducer } from './settings/notifications/reducers'
import { reducer as branchofficesReducer } from './settings/branchoffices/reducers'
import { reducer as processingordersReducer } from './settings/processingorders/reducers'
import { reducer as previousordersReducer } from './settings/previousorders/reducers'
import { reducer as paymentmethodsReducer } from './settings/paymentmethods/reducers'
import { reducer as faqsReducer } from './settings/help/faqs/reducers'
import { reducer as customproductReducer } from './customproduct/reducers'
import { reducer as flavorsReducer } from './customproduct/flavors/reducers'
import { reducer as languagesReducer } from './settings/appsettings/languages/reducers'
import { reducer as currenciesReducer } from './settings/appsettings/currencies/reducers'

const reducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  similarto: similartoReducer,
  categories: categoriesReducer,
  itemsbycategory: itemsbycategoryReducer,
  carousel: carouselReducer,
  status: statusReducer,
  itemsbystatus: itemsbystatusReducer,
  promotions: promotionsReducer,
  sections: sectionsReducer,
  filters: filtersReducer,
  getoneItem: getoneItemReducer,
  cart: cartReducer,
  clientsmessages: clientsmessagesReducer,
  clientscontactlist: clientscontactlistReducer,
  employeesmessages: employeesmessagesReducer,
  employeescontactlist: employeescontactlistReducer,
  addresses: addressesReducer,
  favorites: favoritesReducer,
  notifications: notificationsReducer,
  branchoffices: branchofficesReducer,
  processingorders: processingordersReducer,
  previousorders: previousordersReducer,
  paymentmethods: paymentmethodsReducer,
  faqs: faqsReducer,
  customproduct: customproductReducer,
  flavors: flavorsReducer,
  languages: languagesReducer,
  currencies: currenciesReducer,
})

export { reducer }
