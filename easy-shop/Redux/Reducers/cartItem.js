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
          if (item._id.$oid === action.payload.id) {
            item.qtyInCart = action.payload.qty
            if (item.qtyInCart < 1) item.qtyInCart = 1
          }
        }
      } else {
        return [...state, action.payload]
      }

    // case CHANGE_QTY_IN_CART:
    //   for (const item of state) {
    //     if (item._id.$oid === action.payload.id) {
    //       item.qtyInCart = action.payload.qty
    //       if (item.qtyInCart < 1) item.qtyInCart = 1
    //     }
    //   }

    case REMOVE_FROM_CART:
      return state.filter((item) => item.name !== action.payload.name)

    case CLEAR_CART:
      return []

    default:
      return state
  }
}

export default cartItems
