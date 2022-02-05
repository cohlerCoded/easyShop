import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import CartIcon from '../Components/CartIcon'
CartIcon

//Stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import { View } from 'native-base'

const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#e91e63',
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 60 },
        tabBarIconStyle: {},
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
        component={HomeNavigator}
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
