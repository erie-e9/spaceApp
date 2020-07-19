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
import { reducer as chatsReducer } from './chats/reducers'
import { reducer as addressesReducer } from './profile/addresses/reducers'
import { reducer as branchofficesReducer } from './profile/branchoffices/reducers'
import { reducer as paymentmethodsReducer } from './profile/paymentmethods/reducers'
import { reducer as faqsReducer } from './profile/help/faqs/reducers'

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
  chats: chatsReducer,
  addresses: addressesReducer,
  branchoffices: branchofficesReducer,
  paymentmethods: paymentmethodsReducer,
  faqs: faqsReducer,
})

export { reducer }
