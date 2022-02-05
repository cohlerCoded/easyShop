import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../Redux/Actions/cartActions'
import { Heading, HStack, VStack, FlatList } from 'native-base'
import EasyButton from '../../Components/EasyButton'
import CartItem from './CartItem'

const { height, width } = Dimensions.get('window')

const Cart = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  let cartItems = useSelector((state) => state.cartItems)

  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
  let totalPrice = addDecimals(
    cartItems.reduce(
      (sumPrice, item) => sumPrice + item.price * item.qtyInCart,
      0
    )
  )
  useEffect(() => {
    for (let i = 0; i < 102; i++) {
      cartItems.push(i)
    }
  }, [])

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
        <View style={{ height: height - 155 }}>
          <Heading style={{ alignSelf: 'center' }}>Cart</Heading>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={Platform.select({
              ios: () => 60,
              android: () => 60,
            })()}
          >
            <View style={{ marginBottom: 100 }}>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id.$oid}
                renderItem={({ item }) => {
                  return <CartItem item={item} navigation={navigation} />
                }}
              />
            </View>
          </KeyboardAvoidingView>
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
