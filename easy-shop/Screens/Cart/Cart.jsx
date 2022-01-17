import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../Redux/Actions/cartActions'

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
        cartItems.map((item) => (
          <View style={{ flexDirection: 'row' }}>
            <Text>Item: {item.name} </Text>
            <Text>Qty:{item.qtyInCart}</Text>
            <Button
              title='Checkout'
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
        ))
      )}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
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
