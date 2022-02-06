import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import CartIcon from '../Components/CartIcon'
CartIcon

//Stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import { View } from 'native-base'
import AnimationSandbox from '../Screens/Admin/AnimationSandbox'

const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#7dd3fc',
        tabBarInactiveTintColor: '#0369a1',
        tabBarHideOnKeyboard: true,
        tabBarStyle: { paddingTop: 10, height: 55, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='shopping-cart' color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Admin'
        component={AnimationSandbox}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='cog' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='User'
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Main
