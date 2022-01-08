import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Cart = ({ navigation }) => {
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
