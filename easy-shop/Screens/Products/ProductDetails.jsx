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
} from 'react-native'
import { Heading, VStack, HStack, Container, Icon } from 'native-base'
import { addToCart } from '../../Redux/Actions/cartActions'

const { width } = Dimensions.get('window')

const ProductDetails = (props) => {
  const [qty, setQty] = useState(0)
  const { item } = props.route.params
  const dispatch = useDispatch()

  const increaseQty = () => setQty(qty + 1)
  const decreaseQty = () => (qty > 0 ? setQty(qty - 1) : qty)

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

            <Button
              title='-'
              disabled={item.countInStock === 0}
              onPress={decreaseQty}
            />
            <Text>{qty}</Text>
            <Button
              title='+'
              disabled={item.countInStock === 0}
              onPress={increaseQty}
            />
            <Button
              title='Add'
              disabled={item.countInStock === 0}
              onPress={() => dispatch(addToCart(item, qty))}
            />
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
    flexDirection: 'row',
    position: 'absolute',
    alignContent: 'space-between',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
})
