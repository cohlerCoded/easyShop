import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { Text, VStack, HStack, Image, Divider } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width } = Dimensions.get('window')

const SearchedProducts = ({ productsFiltered, navigation }) => {
  return (
    <KeyboardAwareScrollView
      style={{ width: width }}
      keyboardShouldPersistTaps='never'
      enableOnAndroid={true}
      viewIsInsideTabBar={true}
      extraScrollHeight={20}
    >
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate('Product Details', { item })
            }}
          >
            <VStack key={item._id.$oid} avatar>
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
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </KeyboardAwareScrollView>
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
