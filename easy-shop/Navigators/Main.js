import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome'
const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarHideOnKeyboard: true,
      }}
    >
        <Tab.Screen 
        name='Home' 
        component={} 
        options={{
            tabBarIcon:({color})=>(
            <Icon 
            name='home'
            color={color}
            size={30}/>
        )}}
        />
        <Tab.Screen 
        name='Cart' 
        component={} 
        options={{
            tabBarIcon:({color})=>(
            <Icon 
            name='shopping-cart'
            color={color}
            size={30}/>
        )}}
        />
        <Tab.Screen 
        name='Admin' 
        component={} 
        options={{
            tabBarIcon:({color})=>(
            <Icon 
            name='cog'
            color={color}
            size={30}/>
        )}}
        />
        <Tab.Screen 
        name='User' 
        component={} 
        options={{
            tabBarIcon:({color})=>(
            <Icon 
            name='user'
            color={color}
            size={30}/>
        )}}
        />
    </Tab.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})
