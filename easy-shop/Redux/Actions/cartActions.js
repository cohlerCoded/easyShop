import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants'

export const addToCart = (payload, qty) => {
  return {
    type: ADD_TO_CART,
    payload: {
      ...payload,
      qtyInCart:
        qty && payload.qtyInCart
          ? (payload.qtyInCart += qty)
          : payload.qtyInCart > 0
          ? payload.qtyInCart
          : 0,
    },
  }
}
export const removeFromCart = (payload) => {
  return { type: REMOVE_FROM_CART, payload }
}
export const clearCart = () => {
  return { type: CLEAR_CART }
}
