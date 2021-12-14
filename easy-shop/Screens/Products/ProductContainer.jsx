import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import products from '../../assets/products.json'
const ProductContainer = () => {
  const renderItem = ({ item }) => (
    <View style={{ padding: 0 }}>
      <Text>{item.name}</Text>
      {console.log(item.image)}
      <TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={[styles.container, { height: '100%', marginVertical: '50%' }]}>
      <Text>Product Container</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.$oid}
      />
    </View>
  )
}

export default ProductContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 250,
    height: 250,
  },
})
