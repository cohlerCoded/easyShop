import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const Checkout = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartItems)
  console.log(cartItems)
  return (
    <View>
      <Text>Checkout</Text>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({})
