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
import {
  Container,
  Center,
  Icon,
  Item,
  Input,
  Text,
  Heading,
  VStack,
  Box,
  Divider,
} from 'native-base'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

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
    <SafeAreaView>
      <VStack
        alignSelf='center'
        marginY={5}
        space={5}
        width='80%'
        divider={
          <Box px='2'>
            <Divider />
          </Box>
        }
      >
        <VStack width='100%' space={5} alignItems='center'>
          <Input
            placeholder='Search'
            variant='filled'
            width='100%'
            bg='#6B6B6B'
            borderRadius='10'
            py='1'
            px='2'
            placeholderTextColor='gray.500'
            _hover={{ bg: 'gray.200', borderWidth: 0 }}
            borderWidth='0'
            _web={{
              _focus: { style: { boxShadow: 'none' } },
            }}
            InputLeftElement={
              <Icon
                ml='2'
                size='5'
                color='gray.500'
                as={<Ionicons name='ios-search' />}
              />
            }
          />
        </VStack>
      </VStack>
      <View style={{ backgroundColor: 'gainsboro' }}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductList key={item.id} item={item} />}
          keyExtractor={(item) => item._id.$oid}
        />
      </View>
    </SafeAreaView>
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
