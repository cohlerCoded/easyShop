import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Actions/cartActions'

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems)

  return (
    <View>
      {cartItems.map((item) => (
        <View style={{ flexDirection: 'row' }}>
          <Text>Item: {item.name} </Text>
          <Text>Qty:{item.qtyInCart}</Text>
        </View>
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
