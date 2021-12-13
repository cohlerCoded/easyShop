import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const ProductContainer = () => {
  return (
    <View>
      <Text>Product Container</Text>
    </View>
  )
}

export default ProductContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
