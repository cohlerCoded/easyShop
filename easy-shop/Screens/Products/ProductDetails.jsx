import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProductDetails = (props) => {
  const { item } = props.route.params
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})
