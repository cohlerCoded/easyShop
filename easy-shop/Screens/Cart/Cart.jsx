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
import CartItem from './CartItem'

const { height, width } = Dimensions.get('window')

const Cart = ({ navigation }) => {
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
      {!cartItems.length ? (
        <>
          <Text style={styles.emptyCartText}>Your cart is empty &#128577;</Text>
          <TouchableOpacity
            style={styles.startShoppingBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.startShoppingBtnText}>&#x1F6D2;</Text>
            <Text style={styles.startShoppingBtnText}>Start Shopping!</Text>
            <Text style={styles.startShoppingBtnText}>&#x1F6D2;</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <ScrollView style={{ marginBottom: 60 }}>
            <Heading style={{ alignSelf: 'center' }}>Cart</Heading>
            {cartItems.map((item, i) => (
              <CartItem item={item} key={i} navigation={navigation} />
            ))}
          </ScrollView>
          <VStack style={styles.bottomContainer}>
            <HStack>
              <VStack
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  Cart Subtotal
                </Text>
                <Text style={styles.price}>$ {totalPrice}</Text>
              </VStack>
            </HStack>
            <HStack>
              <EasyButton danger medium onPress={() => dispatch(clearCart())}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>
            </HStack>
            <HStack>
              <EasyButton
                primary
                medium
                onPress={() => navigation.navigate('Checkout')}
              >
                <Text style={{ color: 'white' }}>Checkout</Text>
              </EasyButton>
            </HStack>
          </VStack>
        </View>
      )}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  startShoppingBtn: {
    flexDirection: 'row',
    marginTop: '50%',
    alignSelf: 'center',
    height: 100,
    width: 250,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  startShoppingBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: width,
    height: 60,
    bottom: 0,
    left: 0,
  },
  price: {
    fontSize: 20,
    color: 'green',
  },
})
