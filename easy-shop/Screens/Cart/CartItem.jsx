import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  changeQtyInCart,
  clearCart,
  removeFromCart,
} from '../../Redux/Actions/cartActions'

import { FontAwesome } from 'react-native-vector-icons'
import {
  Image,
  Container,
  Heading,
  HStack,
  VStack,
  Divider,
  Icon,
  ScrollView,
} from 'native-base'
import EasyButton from '../../Components/EasyButton'

const { height, width } = Dimensions.get('window')

const CartItem = ({ navigation }) => {
  const dispatch = useDispatch()
  let cartItems = useSelector((state) => state.cartItems)
  console.log(cartItems)
  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
  let totalPrice = addDecimals(
    cartItems.reduce(
      (sumPrice, item) => sumPrice + item.price * item.qtyInCart,
      0
    )
  )
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})
