import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductContainer from '../Screens/Products/ProductContainer'
import ProductDetails from '../Screens/Products/ProductDetails'

const Stack = createNativeStackNavigator()
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Product Details'
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator = () => <MyStack />
