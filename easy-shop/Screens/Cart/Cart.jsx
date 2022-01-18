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
import { addToCart, changeQtyInCart } from '../../Redux/Actions/cartActions'

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

const { height, width } = Dimensions.get('window')

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems)

  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  return (
    <View>
      {!cartItems.length ? (
        <>
          <Text style={styles.emptyCartText}>Your cart is empty &#128577;</Text>
          <TouchableOpacity style={styles.startShoppingBtn}>
            <Text style={styles.startShoppingBtnText}>&#x1F6D2;</Text>
            <Text style={styles.startShoppingBtnText}>Start Shopping!</Text>
            <Text style={styles.startShoppingBtnText}>&#x1F6D2;</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView>
          <Heading style={{ alignSelf: 'center' }}>Cart</Heading>
          {cartItems.map((item, i) => (
            <VStack key={i} space={3}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  margin: 10,
                }}
              >
                <Icon as={FontAwesome} name='trash' />
              </TouchableOpacity>
              <HStack
                alignItems='flex-start'
                marginTop='10'
                marginLeft='3'
                marginRight='3'
              >
                <Image
                  resizeMode='contain'
                  size='xl'
                  source={
                    item.image
                      ? { uri: item.image }
                      : {
                          uri: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                        }
                  }
                />
                <VStack alignContent='flex-start'>
                  <Text
                    style={{ marginLeft: 5, fontSize: 24, fontWeight: 'bold' }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      marginVertical: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    ${addDecimals(item.price)}/Item
                  </Text>
                  <HStack style={{ marginLeft: 5 }}>
                    <TouchableOpacity
                      style={styles.qtyButtons}
                      disabled={item.countInStock === 0}
                      onPress={() =>
                        dispatch(changeQtyInCart(item._id, item.qtyInCart - 1))
                      }
                    >
                      <Text style={styles.qtyButtonsText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      onBlur={() =>
                        dispatch(changeQtyInCart(item.qtyInCart / 1))
                      }
                      style={styles.qtyInput}
                      maxLength={4}
                      value={item.qtyInCart.toString()}
                      keyboardType='numeric'
                      onChangeText={(text) => dispatch(changeQtyInCart(text))}
                    />
                    <TouchableOpacity
                      style={styles.qtyButtons}
                      disabled={item.countInStock === 0}
                      onPress={() =>
                        dispatch(changeQtyInCart(item._id, item.qtyInCart + 1))
                      }
                    >
                      <Text style={styles.qtyButtonsText}>+</Text>
                    </TouchableOpacity>
                  </HStack>
                  <Text
                    style={{
                      marginLeft: 5,
                      marginTop: 20,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Subtotal: ${addDecimals(item.price * item.qtyInCart)}
                  </Text>
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          ))}
          <Button
            title='Checkout'
            onPress={() => navigation.navigate('Checkout')}
          />
        </ScrollView>
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
  qtyButtons: {
    backgroundColor: '#dadada',
    height: 50,
    width: 40,
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  qtyButtonsText: {
    textAlign: 'center',
    fontSize: 30,
  },
  qtyInput: {
    width: 50,
    height: 50,
    fontSize: 16,
    textAlign: 'center',
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})
