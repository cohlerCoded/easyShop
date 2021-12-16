import React from 'react'
import { StyleSheet, Dimensions, View, Image, Text, Button } from 'react-native'

const { width } = Dimensions.get('window')

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.subString(0, 15 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock>0?}
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
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 9,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: 'orange',
    fontSize: 20,
    marginTop: 10,
  },
})
