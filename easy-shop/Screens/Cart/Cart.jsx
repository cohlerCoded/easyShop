import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  //   const { cartItems } = cart
  return (
    <View>
      <Text>Cart Screen</Text>
      <Button
        title='Checkout'
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})
