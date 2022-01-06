import React from 'react'
import { TouchableOpacity, Dimensions, View } from 'react-native'
import ProductCard from './ProductCard'
import { CommonActions } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const ProductList = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      onPress={() => navigation.navigate('Product Details', { item })}
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  )
}

export default ProductList
