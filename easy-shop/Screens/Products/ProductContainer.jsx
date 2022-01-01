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
  ScrollView,
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
  KeyboardAvoidingView,
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

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

const ProductContainer = ({ navigation }) => {
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
    setProductsCtg(products)
    setActive(-1)
    setInitialState(data)
    return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
      setActive()
    }
  }, [products])

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
              products.filter((product) => product.category.$oid === id)
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
        <View
          style={{
            backgroundColor: 'gainsboro',
          }}
        >
          <FlatList
            ListHeaderComponent={
              <>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    filterProducts={filterByCategory}
                    categories={categories}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
              </>
            }
            numColumns={2}
            data={productsCtg}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item._id.$oid}
          />
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return (
                  <ProductList
                    navigation={navigation}
                    key={item.name}
                    item={item}
                  />
                )
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text>No products found</Text>
            </View>
          )}
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
  center: {
    alignItems: 'center',
  },
  listContainer: {
    height: height,
    marginBottom: 150,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
})

export default ProductContainer
