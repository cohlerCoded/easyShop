import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../Screens/Cart/Cart'
import CheckoutNavigator from './CheckoutNavigator'

const Stack = createNativeStackNavigator()
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Cart'
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CartNavigator = () => <MyStack />
