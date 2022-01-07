import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants'
const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    case REMOVE_FROM_CART:
      return state.filter((item) => item !== action.payload)
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export default cartItems
