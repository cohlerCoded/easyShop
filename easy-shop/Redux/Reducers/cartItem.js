import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants'
const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      for (const item of state) {
        if (item._id === payload._id) {
          item.qtyInCart += action.payload
          return state
        } else {
          return [...state, action.payload]
        }
      }
    case REMOVE_FROM_CART:
      return state.filter((item) => item !== action.payload)
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartItems
