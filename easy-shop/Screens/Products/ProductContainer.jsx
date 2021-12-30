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
  Keyboard,
} from 'react-native'
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
import data from '../../assets/products.json'
import categories from '../../assets/categories.json'
import ProductList from './ProductList'
import SearchedProducts from './SearchedProducts'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import Banner from '../../Components/Banner'
import CategoryFilter from './CategoryFilter'
import productCategories from '../../assets/categories.json'

const ProductContainer = () => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [focus, setFocus] = useState()
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])

  useEffect(() => {
    setProducts(data)
    setProductsFiltered(data)
    setFocus(false)
    setCategories([
      {
        _id: {
          $oid: 'all',
        },
        name: 'All',
        __v: 0,
      },
      ...productCategories,
    ])
    setActive(-1)
    setInitialState(data)
    return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
    }
  }, [])

  const searchProduct = (text) =>
    setProductsFiltered(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    )

  //Categories

  const filterByCategory = (id) => {
    {
      id === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((product) => product.category._id.$oid === id)
            ),
            setActive(true),
          ]
    }
  }

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
        <VStack width='100%' alignItems='center'>
          <Input
            placeholder='Search'
            fontSize='16'
            selectionColor='#eee'
            color='#eee'
            variant='filled'
            width='100%'
            bg='#707070'
            borderRadius='10'
            py='1'
            px='2'
            placeholderTextColor='#b8b8b8'
            _hover={{ bg: 'gray.200', borderWidth: 0 }}
            borderWidth='0'
            _web={{
              _focus: { style: { boxShadow: 'none' } },
            }}
            InputLeftElement={
              <Icon
                ml='2'
                size='5'
                color='#b8b8b8'
                as={<Ionicons name='ios-search' />}
              />
            }
            InputRightElement={
              focus && (
                <Icon
                  mr='2'
                  size='5'
                  color='#b8b8b8'
                  as={<Ionicons name='ios-close' />}
                  onPress={() => {
                    Keyboard.dismiss()
                    setFocus(false)
                  }}
                />
              )
            }
            onFocus={() => setFocus(true)}
            // onBlur={() => setFocus(false)}
            onChangeText={searchProduct}
          />
        </VStack>
      </VStack>
      {focus == true ? (
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <View style={{ backgroundColor: 'gainsboro' }}>
          <Banner />
          <View>
            <CategoryFilter
              filterProducts={filterByCategory}
              categories={categories}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item._id.$oid}
          />
        </View>
      )}
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
