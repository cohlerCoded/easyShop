import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { Text, VStack, HStack, Image, Divider } from 'native-base'

const { width } = Dimensions.get('window')

const SearchedProducts = ({ productsFiltered }) => {
  console.log(productsFiltered)
  return (
    <ScrollView style={{ width: width }} keyboardShouldPersistTaps='never'>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <VStack
            onPress={() => {
              props.navigation.navigate('Product Detail', { item: item })
            }}
            key={item._id.$oid}
            avatar
          >
            <HStack>
              <Image
                borderWidth='2'
                borderColor='#eee'
                margin='5'
                size='12'
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
                alt={item.name}
              />
              <VStack alignSelf='center'>
                <Text bold>{item.name}</Text>
                <VStack>
                  <Text fontSize='xs'>{item.description}</Text>
                </VStack>
              </VStack>
            </HStack>
            <Divider />
          </VStack>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
})
export default SearchedProducts
