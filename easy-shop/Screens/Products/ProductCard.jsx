import React from 'react'
import { StyleSheet, Dimensions, View, Image, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const { width } = Dimensions.get('window')

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cartItems)

  //Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={
          image
            ? { uri: image }
            : {
                uri: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }
        }
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${addDecimals(price)}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button title='Add' color='green' onPress={() => dispatch(add)} />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Out of Stock</Text>
      )}
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
  },
})
