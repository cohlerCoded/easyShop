import React, { useState, useEffect } from 'react'
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

const { width } = Dimensions.get('window')

const ProductDetails = (props) => {
  const { item } = props.route.params
  console.log(item)
  return (
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
    </ScrollView>
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
    padding: 5,
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
})
