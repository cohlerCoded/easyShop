import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CHANGE_QTY_IN_CART,
} from '../constants'
const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (action.payload.id) {
        for (const item of state) {
          if (item._id === action.payload.id) {
            item.qtyInCart += action.payload.qty
          }
        }
      } else {
        return [...state, action.payload]
      }

    case CHANGE_QTY_IN_CART:
      if (action.payload.id) {
        for (const item of state) {
          if (item._id === action.payload.id) {
            item.qtyInCart = action.payload.qty
          }
        }
      } else {
        return [...state, action.payload]
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
