import { combineReducers } from 'redux'
import { reducer as userReducer } from './user/reducers'
import { reducer as menuReducer } from './menu/reducers'
import { reducer as similartoReducer } from './menu/similarto/reducers'
import { reducer as categoriesReducer } from './menu/categories/reducers'
import { reducer as itemsbycategoryReducer } from './menu/categories/itemsbycategory/reducers'
import { reducer as carouselReducer } from './menu/carousel/reducers'
import { reducer as promotionsReducer } from './menu/promotions/reducers'
import { reducer as sectionsReducer } from './menu/sections/reducers'
import { reducer as cartReducer } from './cart/reducers'
import { reducer as clientsmessagesReducer } from './chats/clients/messages/reducers'
import { reducer as clientscontactlistReducer } from './chats/clients/contactlist/reducers'
import { reducer as employeesmessagesReducer } from './chats/employees/messages/reducers'
import { reducer as employeescontactlistReducer } from './chats/employees/contactlist/reducers'
import { reducer as addressesReducer } from './profile/addresses/reducers'
import { reducer as favoritesReducer } from './profile/favorites/reducers'
import { reducer as notificationsReducer } from './profile/notifications/reducers'
import { reducer as branchofficesReducer } from './profile/branchoffices/reducers'
import { reducer as previousordersReducer } from './profile/previousorders/reducers'
import { reducer as paymentmethodsReducer } from './profile/paymentmethods/reducers'
import { reducer as faqsReducer } from './profile/help/faqs/reducers'
import { reducer as customproductReducer } from './customproduct/reducers'
import { reducer as flavorsReducer } from './customproduct/flavors/reducers'

const reducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  similarto: similartoReducer,
  categories: categoriesReducer,
  itemsbycategory: itemsbycategoryReducer,
  carousel: carouselReducer,
  promotions: promotionsReducer,
  sections: sectionsReducer,
  cart: cartReducer,
  clientsmessages: clientsmessagesReducer,
  clientscontactlist: clientscontactlistReducer,
  employeesmessages: employeesmessagesReducer,
  employeescontactlist: employeescontactlistReducer,
  addresses: addressesReducer,
  favorites: favoritesReducer,
  notifications: notificationsReducer,
  branchoffices: branchofficesReducer,
  previousorders: previousordersReducer,
  paymentmethods: paymentmethodsReducer,
  faqs: faqsReducer,
  customproduct: customproductReducer,
  flavors: flavorsReducer,
})

export { reducer }
