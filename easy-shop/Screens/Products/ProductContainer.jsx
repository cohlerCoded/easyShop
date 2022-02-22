import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native'
import { Icon, Input, Text, VStack, Box, Divider } from 'native-base'
import data from '../../assets/products.json'
import ProductList from './ProductList'
import SearchedProducts from './SearchedProducts'
import { Ionicons } from '@expo/vector-icons'
import Banner from '../../Components/Banner'
import CategoryFilter from './CategoryFilter'
import productCategories from '../../assets/categories.json'
import SearchBar from '../../Components/SearchBar'

const { height } = Dimensions.get('window')

const ProductContainer = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [focus, setFocus] = useState()
  const [searchTerm, setSearchTerm] = useState('')
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
    <SafeAreaView style={styles.container}>
      <VStack
        alignSelf='center'
        space={5}
        divider={
          <Box px='2'>
            <Divider />
          </Box>
        }
      >
        <VStack width='100%' alignItems='center'>
          <SearchBar
            icon={'search'}
            term={searchTerm}
            onTermChange={(text) => {
              setSearchTerm(text)
              setFocus(true)
              searchProduct(searchTerm)
            }}
            onFocus={() => setFocus(true)}
            closeSearch={() => {
              setSearchTerm('')
              setFocus(false)
              Keyboard.dismiss()
            }}
          />
        </VStack>
      </VStack>
      {focus == true ? (
        <SearchedProducts
          productsFiltered={productsFiltered}
          navigation={navigation}
        />
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
            renderItem={({ item }) => (
              <ProductList navigation={navigation} key={item.id} item={item} />
            )}
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
    height: height - 230,
  },
  center: {
    alignItems: 'center',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
})

export default ProductContainer
