import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge, Text } from 'native-base'

import { connect } from 'react-redux'

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge // bg="red.400"
          position='absolute'
          colorScheme='danger'
          rounded='full'
          width={7}
          height={7}
          zIndex={1}
          variant='solid'
          right={-15}
          top={-10}
          _text={{
            marginY: 1,
            textAlign: 'center',
            fontSize: 8,
          }}
        >
          {props.cartItems.length}
        </Badge>
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems,
  }
}

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -4,
    right: -15,
  },
  text: {
    right: 0,
    position: 'absolute',
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
})

export default connect(mapStateToProps)(CartIcon)
