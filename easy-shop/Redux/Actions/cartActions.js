import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants'

export const addToCart = (payload, qty) => (dispatch, getState) => {
  const cart = getState().cartItems
  console.log(cart)
  for (const item of cart) {
    console.log(item)
    if (item._id === payload._id) {
      return {
        type: ADD_TO_CART,
        payload: qty,
      }
    }
  }
  return {
    type: ADD_TO_CART,
    payload: {
      ...payload,
      qtyInCart: qty,
    },
  }
}

export const removeFromCart = (payload) => {
  return { type: REMOVE_FROM_CART, payload }
}
export const clearCart = () => {
  return { type: CLEAR_CART }
}
