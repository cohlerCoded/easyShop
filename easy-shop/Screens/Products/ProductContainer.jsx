import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import data from '../../assets/products.json'
import ProductList from './ProductList'
import { Container, Icon, Item, Input, Text, Heading } from 'native-base'

const ProductContainer = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    setProducts(data)
    return () => {
      setProducts([])
    }
  }, [])

  // const renderItem = ({ item }) => (
  //   <View style={{ padding: 0 }}>
  //     <Text>{item.name}</Text>
  //     {console.log(item.image)}
  //     <TouchableOpacity>
  //       <Image source={{ uri: item.image }} style={styles.productImage} />
  //     </TouchableOpacity>
  //   </View>
  // )

  return (
    <Container>
      {/* <Heading>
        <Item>
          <Icon name='ios-search' />
        </Item>
      </Heading> */}
      <View style={{ backgroundColor: 'gainsboro' }}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductList key={item.id} item={item} />}
          keyExtractor={(item) => item._id.$oid}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    resizeMode: 'center',
    width: 250,
    height: 250,
  },
})

export default ProductContainer
