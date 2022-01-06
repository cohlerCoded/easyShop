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
            <Text style={styles.price}>${item.price}</Text>

            <Button title='Add' />
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