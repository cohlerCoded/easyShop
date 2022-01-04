import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Header from './Components/Header'
import ProductContainer from './Screens/Products/ProductContainer'
import { NavigationContainer } from '@react-navigation/native'

//Navigators

import Main from './Navigators/Main'

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Header />
          <ProductContainer />
        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
