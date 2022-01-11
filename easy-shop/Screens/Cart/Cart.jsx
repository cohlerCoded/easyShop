import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cartItems)

  console.log(cartItems)
  return (
    <View>
      {cartItems.map((item) => (
        <Text>{item.name}</Text>
      ))}

      <Button
        title='Checkout'
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})
