import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge } from 'native-base'
import { useSelector } from 'react-redux'

import { connect } from 'react-redux'

const CartIcon = (props) => {
  let cartItems = useSelector((state) => state.cartItems)
  return (
    <>
      {cartItems.length ? (
        <Badge // bg="red.400"
          position='absolute'
          colorScheme='danger'
          rounded='full'
          width={cartItems.length > 9 ? 7 : 6}
          height={6}
          zIndex={1}
          variant='solid'
          right={-15}
          top={-8}
          _text={{
            marginY: 0.5,
            textAlign: 'center',
            fontSize: 9,
          }}
        >
          {cartItems.length > 99 ? 99 : cartItems.length}
        </Badge>
      ) : null}
    </>
  )
}

// const mapStateToProps = (state) => {
//   const { cartItems } = state
//   return {
//     cartItems: cartItems,
//   }
// }

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -6,
    right: -10,
  },
  text: {
    right: 0,
    position: 'absolute',
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
})

export default CartIcon
