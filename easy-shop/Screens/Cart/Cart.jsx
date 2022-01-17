import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Actions/cartActions'

import { Icon } from 'react-native-vector-icons/FontAwesome'
import {
  Image,
  Container,
  Heading,
  HStack,
  VStack,
  Divider,
  Box,
} from 'native-base'

const { height, width } = Dimensions.get('window')

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems)

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
        <>
          <Heading style={{ alignSelf: 'center' }}>Cart</Heading>
          {cartItems.map((item, i) => (
            <VStack key={i} space={3}>
              <HStack
                alignItems='center'
                marginTop='3'
                marginLeft='3'
                marginRight='3'
              >
                <Image
                  size='sm'
                  source={
                    item.image
                      ? { uri: item.image }
                      : {
                          uri: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                        }
                  }
                />
                <VStack>
                  <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                  <Text style={{ marginLeft: 5 }}>${item.price}</Text>
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          ))}
          <Button
            title='Checkout'
            onPress={() => navigation.navigate('Checkout')}
          />
        </>
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
})
