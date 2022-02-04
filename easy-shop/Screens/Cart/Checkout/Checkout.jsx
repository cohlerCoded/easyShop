import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const Checkout = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartItems)
  console.log(cartItems)
  return (
    <View>
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        &#x1F4E6; Checkout &#x1F4E6;
      </Text>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({})
