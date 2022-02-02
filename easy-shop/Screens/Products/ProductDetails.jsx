import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Heading, VStack, HStack, Container, Icon } from 'native-base'
import { addToCart, changeQtyInCart } from '../../Redux/Actions/cartActions'

const { width } = Dimensions.get('window')

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1)
  const { item } = props.route.params
  let cartItems = useSelector((state) => state.cartItems)
  const dispatch = useDispatch()

  const increaseQty = () => setQty(qty + 1)
  const decreaseQty = () => (qty > 1 ? setQty(qty - 1) : qty)

  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={
            item.image
              ? { uri: item.image }
              : {
                  uri: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }
          }
        />
        <View style={styles.contentContainer}>
          <Heading size='xl' style={{ marginBottom: 20 }}>
            {item.name}
          </Heading>
          <Heading size='md'>{item.brand}</Heading>
        </View>
        {/*   todo rich desc availability */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <VStack w='100%'>
          <HStack justifyContent='space-between'>
            <Text style={styles.price}>${addDecimals(item.price)}</Text>
            <HStack>
              <TouchableOpacity
                style={styles.qtyButtons}
                disabled={item.countInStock === 0}
                onPress={decreaseQty}
              >
                <Text style={styles.qtyButtonsText}>-</Text>
              </TouchableOpacity>
              <TextInput
                onBlur={() =>
                  !qty || qty < 1 ? setQty(1) : setQty(Math.ceil(parseInt(qty)))
                }
                style={styles.qtyInput}
                maxLength={4}
                value={qty.toString()}
                keyboardType='numeric'
                onChangeText={(text) => setQty(text)}
              />
              <TouchableOpacity
                style={styles.qtyButtons}
                disabled={item.countInStock === 0}
                onPress={increaseQty}
              >
                <Text style={styles.qtyButtonsText}>+</Text>
              </TouchableOpacity>
            </HStack>
            <TouchableOpacity
              style={styles.addToCartBtn}
              disabled={item.countInStock === 0}
              onPress={() => dispatch(addToCart(item, parseInt(qty)))}
            >
              <Text style={styles.addToCartBtnText}>Add To Cart</Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </View>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 80,
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    height: 50,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    width: 100,
    fontSize: 24,
    marginLeft: 5,
    alignSelf: 'center',
    color: 'green',
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
  addToCartBtn: {
    width: 100,
    marginRight: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addToCartBtnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})
