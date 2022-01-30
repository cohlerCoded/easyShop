import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeQtyInCart,
  removeFromCart,
} from '../../Redux/Actions/cartActions'

import { FontAwesome } from 'react-native-vector-icons'
import { Image, HStack, VStack, Divider, Icon } from 'native-base'

const { height, width } = Dimensions.get('window')

const CartItem = ({ navigation, item }) => {
  const dispatch = useDispatch()

  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  return (
    <VStack space={3}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          margin: 20,
        }}
        onPress={() => dispatch(removeFromCart(item))}
      >
        <Icon as={FontAwesome} name='trash' size={5} />
      </TouchableOpacity>
      <HStack
        alignItems='flex-start'
        marginTop='10'
        marginLeft='3'
        marginRight='3'
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Product Details', { item })}
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
            alt={item.name}
          />
        </TouchableOpacity>
        <VStack alignContent='flex-start'>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 24,
              fontWeight: 'bold',
            }}
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
                dispatch(changeQtyInCart(item, item.qtyInCart - 1))
              }
            >
              <Text style={styles.qtyButtonsText}>-</Text>
            </TouchableOpacity>
            <TextInput
              onBlur={() => dispatch(changeQtyInCart(item, item.qtyInCart / 1))}
              style={styles.qtyInput}
              maxLength={4}
              value={item.qtyInCart.toString()}
              keyboardType='numeric'
              onChangeText={(text) => dispatch(changeQtyInCart(item, text))}
            />
            <TouchableOpacity
              style={styles.qtyButtons}
              disabled={item.countInStock === 0}
              onPress={() =>
                dispatch(changeQtyInCart(item, item.qtyInCart + 1))
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
  )
}

export default CartItem

const styles = StyleSheet.create({
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
