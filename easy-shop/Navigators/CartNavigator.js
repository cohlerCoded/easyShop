import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../Screens/Cart/Cart'
import Checkout from '../Screens/Cart/Checkout'

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
        component={Checkout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default CartNavigator = () => <MyStack />
