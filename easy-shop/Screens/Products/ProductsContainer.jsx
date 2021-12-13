import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const ProductsContainer = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator wi color='#0000ff' />
      {/* <Text>Products Screen</Text> */}
    </View>
  )
}

export default ProductsContainer

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
